import { domainExtract, dataQualityCheck, cleanPrice } from "../util/util";
import axios from "axios";
import { ScrapeResult } from "../../types/ScrapeResult";
import { load } from "cheerio";
import { ErrorLogger } from "../../util/ErrorLogger";
import { ERROR_TYPE } from "../../configs/errorConfig";

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
    return {
      success: false,
      errorMessage: `Failed to fetch the price data.`,
      module,
    };
  }
};
