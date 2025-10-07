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

/**
 * Periodically executes the product scraping task.
 *
 * This scheduled task performs the following operations:
 * - Runs automatically at a fixed interval (e.g., every 10 minutes; every 5 seconds in development).
 * - Selects all products that were last updated more than 24 hours ago.
 * - Initiates the scraper to fetch the current product prices.
 * - Updates the database with the latest price and timestamp.
 * - If the new price is lower than the previous one, sends a notification message to the user.
 * - Ensures that only one cron job runs at a time to prevent overlap.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the scraping cycle completes.
 */

let isRunning: boolean = false;
const scrapeTask = async () => {
  // ✅ Scheduled task execution interval:
  //    - Production: every 12 hours
  //    - Development: every 5 seconds

  // ✅ Step 1: Select products that haven’t been updated in the last 24 hours.

  // ✅ Step 2: Start the scraper and fetch updated product data.

  // ✅ Step 3: Store the new price and timestamp in the database.

  // ✅ Step 4: If the current price is lower than before, send a notification to the user.

  // ✅ Step 5: Wait at least 30 seconds before initiating another scraping cycle.

  // ✅ Step 6: Ensure no concurrent cron jobs are running (prevent duplicate execution).

  // Example debug line:
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
        await sleep(60); // 60 in production
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
            // productID: 1234,
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

  console.log(`👍 Scraping Job ended in ${duration}`);
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
