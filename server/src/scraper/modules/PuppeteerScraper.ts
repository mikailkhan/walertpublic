import { ScrapeResult } from "../../types/ScrapeResult";
import puppeteer from "puppeteer";
import { domainExtract, dataQualityCheck, cleanPrice } from "../util/util";
import { ErrorLogger } from "../../util/ErrorLogger";
import { ERROR_TYPE } from "../../configs/errorConfig";

export const startPuppeteerScraper = async (
  url: string,
  priceSelector: string,
  productNameSelector: string
): Promise<ScrapeResult> => {
  const module = "PuppeteerScraper";
  try {
    const browser = await puppeteer.launch({
      headless: true, // run in headless mode (no GUI)
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-zygote",
        "--single-process",
      ],
    });
    const page = await browser.newPage();

    // Optional: Set a user agent to avoid bot detection
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
    );

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000, // 60 seconds
    });

    const rawPrice = await page.$eval(priceSelector, (val) =>
      val.textContent.trim()
    );
    const name = await page.$eval(productNameSelector, (val) =>
      val.textContent.trim()
    );

    await browser.close();
    const domain = domainExtract(url);

    const dataResult = dataQualityCheck({ price: rawPrice, name });

    if (!dataResult.success) {
      return { success: false, errorMessage: dataResult.errorMessage, module };
    }

    const price = cleanPrice(rawPrice);

    return { price, domain, name, success: true, module };
  } catch (error) {
    return {
      success: false,
      errorMessage: `Failed to fetch the price data.`,
      module,
    };
  }
};
