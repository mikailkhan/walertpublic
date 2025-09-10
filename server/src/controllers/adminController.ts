import { Request, Response } from "express";
import { addSupportedWebsite } from "../models/adminModel";
import { domainExtract } from "../scraper/util/util";
import { startScraper } from "../scraper/main";
import { error } from "console";

export const handleAddSupportedWebsite = async (
  req: Request,
  res: Response
) => {
  try {
    const { url, priceSelector, productNameSelector } = req.body;

    if (
      url.length === 0 ||
      priceSelector.length === 0 ||
      productNameSelector.length === 0
    ) {
      return res.status(400).json({
        errorMessage:
          "URL, Price Selector, and Product Name Selector can't be empty",
      });
    }

    const testURL = await startScraper(url, priceSelector, productNameSelector);

    if (!testURL.success) {
      return res.status(400).json(testURL);
    }

    const website = domainExtract(url);

    if (!website) {
      return res
        .status(400)
        .json({ errorMessage: "Website can't be extracted." });
    }

    const scraperModule = testURL.module;

    await addSupportedWebsite({
      website,
      priceSelector,
      productNameSelector,
      scraperModule,
    });

    return res.status(200).json(testURL);
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "error in adding website"
    );
    return res
      .status(400)
      .json({ errorMessage: "Something went wrong in supported websites." });
  }
};
