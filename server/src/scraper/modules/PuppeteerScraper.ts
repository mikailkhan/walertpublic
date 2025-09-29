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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const rawPrice = await page.$eval(priceSelector, (val) => val.textContent);
    const name = await page.$eval(
      productNameSelector,
      (val) => val.textContent
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
