import { domainExtract, dataQualityCheck, cleanPrice } from "../util/util";
import axios from "axios";
import { ScrapeResult } from "../../types/ScrapeResult";
import { load } from "cheerio";

export const startNormalScraper = async (
  url: string,
  priceSelector: string,
  productNameSelector: string
): Promise<ScrapeResult> => {
  const module = "NormalScraper";
  try {
    const response = await axios.get(url);

    const $ = await load(response.data);

    const rawPrice = $(priceSelector).text();
    const domain = domainExtract(url);
    const name = $(productNameSelector).text();

    const dataResult = dataQualityCheck({ price: rawPrice, name });

    if (!dataResult.success) {
      return { success: false, errorMessage: dataResult.errorMessage, module };
    }

    const price = cleanPrice(rawPrice);

    return { price, domain, name, module, success: true };
  } catch (error) {
    console.error(
      `Error fetching price from ${url}: `,
      error instanceof Error ? error.message : `Unknown error in server`
    );
    return {
      success: false,
      errorMessage: `Failed to fetch the price data.`,
      module,
    };
  }
};
