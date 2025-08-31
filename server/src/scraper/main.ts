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
      errorMessage: `Failed to fetch the price data.`,
    };
  }
};

export const startNormalScraper = async (
  url: string,
  selector: string
): Promise<ScrapeResult> => {
  try {
    const response = await axios.get(url);

    const $ = await load(response.data);

    const price = $(selector).text();
    const domain = domainExtract(url);

    return { price, domain, success: true };
  } catch (error) {
    console.error(
      `Error fetching price from ${url}: `,
      error instanceof Error ? error.message : `Unknown error in server`
    );
    return { success: false, errorMessage: `Failed to fetch the price data.` };
  }
};
