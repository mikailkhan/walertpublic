import { load } from "cheerio";
import { ScrapeResult } from "../types/ScrapeResult";
import puppeteer from "puppeteer";
import axios from "axios";

import { domainExtract } from "./util/DomainExtract";

export const startPuppeteerScraper = async (
  url: string,
  selector: string
): Promise<ScrapeResult> => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    //   await page.setViewport({ width: 1080, height: 1024 });

    const price = await page.$eval(selector, (val) => val.textContent);

    await browser.close();
    const domain = domainExtract(url);

    return { price, domain, success: true };
  } catch (error) {
    console.error(
      `Error in startPuppeter: ${
        error instanceof Error ? error.message : `Unknown error in server`
      }`
    );
    return {
      success: false,
      errorMessage: `Sorry something went wrong try again later.`,
    };
  }
};

export const startNormalScraper = async (
  url: string,
  selector: string
): Promise<ScrapeResult> => {
  const response = await axios.get(url);

  const $ = await load(response.data);

  const price = $(selector).text();
  const domain = domainExtract(url);

  return { price, domain, success: true };
};
