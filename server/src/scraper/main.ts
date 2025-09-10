import { ScrapeResult } from "../types/ScrapeResult";
import { startNormalScraper } from "./modules/NormalScraper";
import { startPuppeteerScraper } from "./modules/PuppeteerScraper";

/**
 * Main scraper function that delegates work to individual scraper modules.
 *
 * Currently, two scraper modules are supported:
 *
 * 1. NormalScraper
 *    - Uses Axios and Cheerio for lightweight scraping.
 *    - Fast and efficient, but fails on dynamic or JavaScript-heavy websites.
 *
 * 2. PuppeteerScraper
 *    - Uses the Puppeteer package for headless browser scraping.
 *    - Heavier and slower, but reliable for dynamic websites (e.g., Daraz).
 *
 * The function first attempts scraping with NormalScraper.
 * If it fails, it falls back to PuppeteerScraper.
 *
 * @param url - url of the product
 * @param priceSelector - css selector for price
 * @param productNameSelector - css selector for product name
 * @returns {Promise<ScrapeResult>}
 */
export const startScraper = async (
  url: string,
  priceSelector: string,
  productNameSelector: string
): Promise<ScrapeResult> => {
  const normalScraperResult = await startNormalScraper(
    url,
    priceSelector,
    productNameSelector
  );

  if (normalScraperResult.success) {
    return normalScraperResult;
  }

  const puppeteerScraperResult = await startPuppeteerScraper(
    url,
    priceSelector,
    productNameSelector
  );

  if (puppeteerScraperResult.success) {
    return puppeteerScraperResult;
  }

  return {
    success: false,
    module: "none",
    errorMessage:
      "Both modules have encountered errors and could not complete successfully.",
  };
};
