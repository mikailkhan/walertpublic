import {
  changeProductScrapeStatus,
  changeProductTimestamp,
  getAllProductsOlderThan,
  logCronJob,
  updateCurrentProductPrice,
} from "../models/ScrapeModel";
import { SCRAPE_STATUS } from "../configs/scrapeConfig";
import { startScraper } from "../scraper/main";
import { ErrorLogger } from "../util/ErrorLogger";
import { ERROR_TYPE } from "../configs/errorConfig";
import { sendTemplateMessage } from "../controllers/message_util/SendMessage";

let isRunning: boolean = false;

const scrapeTask = async () => {
  // ✅ Run every 10 minutes (for dev every 5 seconds)
  // ✅ select products older than 24hr
  // ✅ start scraper
  // ✅ add current price to database
  // ✅ add current timestamp to database
  // if price < then send msg to user.
  // ✅ move to next
  //
  // wait at least 30 seconds before starting another scrape
  // check if cron already is running then don't start another cron.

  // console.log(await getAllProductsOlderThan());

  if (isRunning) {
    return;
  }

  isRunning = true;
  console.log(`✅ [${new Date().toString()}] Scraping Job Started`);
  const taskStartTime = new Date().getTime();
  let successfulProductScrapeCount = 0;
  let failedProductScrapeCount = 0;
  let overallProductScrapeCount = 0;

  const productsToScrape = await getAllProductsOlderThan();
  let previousWebsite = "";
  productsToScrape?.forEach(async (val) => {
    try {
      overallProductScrapeCount++;
      if (previousWebsite === val.websites.website) {
        await sleep(20); // 5 secs
        previousWebsite = val.websites.website;
      } else {
        previousWebsite = val.websites.website;
      }

      await changeProductScrapeStatus(
        val.products.productId,
        SCRAPE_STATUS.INPROGRESS
      );

      // scrape it
      const scrapedResult = await startScraper(
        val.products.link,
        val.websites.priceSelector,
        val.websites.productNameSelector
      );

      console.log(scrapedResult);

      // if scrape was successful
      if (scrapedResult.price) {
        successfulProductScrapeCount++;

        await updateCurrentProductPrice(
          val.products.productId,
          scrapedResult.price
        );

        await changeProductTimestamp(val.products.productId);
        await changeProductScrapeStatus(
          val.products.productId,
          SCRAPE_STATUS.SUCCESS
        );

        if (scrapedResult.price === val.products.originalPrice) {
          // notify user of price drop

          await sendTemplateMessage({
            reciever: val.users.number,
            templateName: "drop_alert",
            username: val.users.fullName,
            productTitle: val.products.productName,
            productID: val.products.productId.toString(),
            website: val.websites.website,
          });
        }
      } else {
        await changeProductScrapeStatus(
          val.products.productId,
          SCRAPE_STATUS.FAILED
        );
        failedProductScrapeCount++;
      }
    } catch (error) {
      await changeProductScrapeStatus(
        val.products.productId,
        SCRAPE_STATUS.FAILED
      );
      ErrorLogger({
        type: ERROR_TYPE.SCRAPER_FAILED,
        error,
        customErrorMessage: `Scrape task failed for product [${val.products.productName}] \n [URL:${val.products.link}]`,
      });
      failedProductScrapeCount++;
    }
  });

  const taskEndTime = new Date().getTime();
  const duration = formatDuration(taskEndTime - taskStartTime);
  logCronJob({
    overallProductScrapeCount,
    successfulProductScrapeCount,
    failedProductScrapeCount,
    duration,
  });

  console.log(`👍 [${new Date().toString()}] Scraping Job ended`);
  isRunning = false;
};

// Util function
const sleep = async (seconds: number) => {
  await new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

const formatDuration = (durationMs: number) => {
  if (durationMs < 1000) {
    return `${durationMs} ms`;
  }

  let totalSeconds = Math.floor(durationMs / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  let parts = [];

  if (hours > 0) parts.push(`${hours} hr${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);
  if (seconds > 0 || parts.length === 0)
    parts.push(`${seconds} sec${seconds > 1 ? "s" : ""}`);

  return parts.join(" ");
};

export default scrapeTask;
