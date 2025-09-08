import { Request, Response } from "express";
import { addSupportedWebsite } from "../models/adminModel";
import { domainExtract } from "../scraper/util/util";
import { startScraper } from "../scraper/main";

export const handleAddSupportedWebsite = async (
  req: Request,
  res: Response
) => {
  const { url, priceSelector, productNameSelector } = req.body;

  if (!url || !priceSelector || !productNameSelector) {
    return res.status(401).end();
  }

  const testURL = await startScraper(url, priceSelector, productNameSelector);

  if (!testURL.success) {
    return res.status(401).json(testURL);
  }

  const website = domainExtract(url);

  if (!website) {
    return res.status(401);
  }

  await addSupportedWebsite({
    website,
    priceSelector,
    productNameSelector,
  });

  return res.status(200).json(testURL);
};
