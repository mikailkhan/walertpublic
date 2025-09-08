import { db } from "../db/db";
import { websiteTable } from "../db/schema";

export const addSupportedWebsite = async ({
  website,
  priceSelector,
  productNameSelector,
}: {
  website: string;
  priceSelector: string;
  productNameSelector: string;
}) => {
  await db.insert(websiteTable).values({
    website,
    priceSelector,
    productNameSelector,
  });

  return;
};
