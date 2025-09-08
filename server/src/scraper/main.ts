import { startNormalScraper } from "./modules/NormalScraper";
import { startPuppeteerScraper } from "./modules/PuppeteerScraper";

export const startScraper = async (
  url: string,
  priceSelector: string,
  productNameSelector: string
) => {
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
    errorMessage:
      "Both modules have encountered errors and could not complete successfully.",
  };
};
