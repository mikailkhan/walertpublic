import { db } from "../db/db";
import { websiteTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const addSupportedWebsite = async ({
  website,
  priceSelector,
  productNameSelector,
  scraperModule,
}: {
  website: string;
  priceSelector: string;
  productNameSelector: string;
  scraperModule: string;
}) => {
  await db.insert(websiteTable).values({
    website,
    priceSelector,
    productNameSelector,
    scraperModule,
  });

  return;
};

export const getSupportedWebsite = async (website: string | undefined) => {
  try {
    if (!website) {
      return;
    }

    const result = await db
      .select()
      .from(websiteTable)
      .where(eq(websiteTable.website, website));

    return result[0];
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return;
  }
};

export const getAllSupportedWebsites = async (active: boolean = false) => {
  try {
    const result = await db
      .select()
      .from(websiteTable)
      .where(eq(websiteTable.active, active));

    return result;
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return;
  }
};
