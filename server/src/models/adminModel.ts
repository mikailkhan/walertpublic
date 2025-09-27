import { db } from "../db/db";
import { websiteTable } from "../db/schema";
import { eq } from "drizzle-orm";

/**
 * Add supported website
 */
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

/**
 * Get details of the specific website
 * @param website
 * @returns {object} result
 */
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

/**
 * Get details of all websites according to active status
 *
 * @param {boolean} active - true: all active sites, false: all non-active sites
 * @returns {object} result
 */
export const getAllSupportedWebsites = async (
  active: boolean | null = false
) => {
  try {
    if (active === null) {
      const result = await db.select().from(websiteTable);

      return result;
    }

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
