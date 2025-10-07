import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  lt,
  ne,
  sql,
} from "drizzle-orm";
import { db } from "../db/db";
import {
  cronLoggerTable,
  productsScrapeTable,
  productsTable,
  usersTable,
  websiteTable,
} from "../db/schema";
import { SCRAPE_STATUS, SCRAPE_STATUS_TYPE } from "../configs/scrapeConfig";

export const getAllProductsOlderThan = async () => {
  try {
    // const twentyFourHoursAgo = sql`NOW() - INTERVAL '24 hours'`;
    const twentyFourHoursAgo = sql`NOW() - INTERVAL '24 hours'`;

    // get details of product such as (User, Website, Product, and ScrapeProduct) that
    // are not scraped in last 24 hours.
    // website status is active
    // and not already being in progress
    const products = await db
      .select()
      .from(productsScrapeTable)
      .innerJoin(
        productsTable,
        eq(productsScrapeTable.productId, productsTable.productId)
      )
      .innerJoin(
        websiteTable,
        eq(productsTable.websiteId, websiteTable.websiteId)
      )
      .innerJoin(usersTable, eq(productsTable.userId, usersTable.userId))
      .where(
        and(
          lt(productsScrapeTable.lastScrape, twentyFourHoursAgo),
          eq(websiteTable.active, true),
          ne(productsScrapeTable.status, SCRAPE_STATUS.INPROGRESS)
        )
      );

    return products;
  } catch (error) {}
};

export const changeProductScrapeStatus = async (
  productId: number,
  newStatus: string
) => {
  try {
    await db
      .update(productsScrapeTable)
      .set({ status: newStatus })
      .where(eq(productsScrapeTable.productScrapeId, productId));
  } catch (error) {}
};

export const changeProductTimestamp = async (productId: number) => {
  try {
    await db
      .update(productsScrapeTable)
      .set({ lastScrape: sql`NOW()` })
      .where(eq(productsScrapeTable.productId, productId));
  } catch (error) {}
};

export const updateCurrentProductPrice = async (
  productId: number,
  currentPrice: number
) => {
  try {
    await db
      .update(productsTable)
      .set({ currentPrice: currentPrice })
      .where(eq(productsScrapeTable.productId, productId));
  } catch (error) {}
};

export const getTotalTrackersPlaced = async () => {
  try {
    const [result] = await db.select({ count: count() }).from(productsTable);
    return result.count;
  } catch (error) {
    return;
  }
};

/**
 * Get total number of supported websites.
 *
 * Status Param:
 * Undefined = Get all websites
 * True = Get all active websites
 * False = Get all non-active websites
 *
 * @param {boolean} status - active or non-active
 * @returns {number} - returns a promise that resolves when a count of rows is fetched
 */
export const getTotalWebsites = async (status?: boolean | undefined) => {
  try {
    let result;
    if (status === undefined) {
      [result] = await db.select({ count: count() }).from(websiteTable);
    } else {
      [result] = await db
        .select({ count: count() })
        .from(websiteTable)
        .where(eq(websiteTable.active, status));
    }

    return result.count;
  } catch (error) {
    return;
  }
};

export const getAllTrackers = async () => {
  try {
    const result = await db
      .select({
        ...getTableColumns(productsTable),
        createdBy: usersTable.fullName,
        number: usersTable.number,
        lastScrape: productsScrapeTable.lastScrape,
        website: websiteTable.website,
      })
      .from(productsTable)
      .innerJoin(usersTable, eq(usersTable.userId, productsTable.userId))
      .innerJoin(
        productsScrapeTable,
        eq(productsScrapeTable.productId, productsTable.productId)
      )
      .innerJoin(
        websiteTable,
        eq(websiteTable.websiteId, productsTable.websiteId)
      )
      .orderBy(desc(productsScrapeTable.productId));
    return result;
  } catch (error) {
    return;
  }
};

export const logCronJob = async ({
  overallProductScrapeCount,
  successfulProductScrapeCount,
  failedProductScrapeCount,
  duration,
}: {
  overallProductScrapeCount: number;
  successfulProductScrapeCount: number;
  failedProductScrapeCount: number;
  duration: string;
}) => {
  try {
    await db.insert(cronLoggerTable).values({
      overallProductScrapeCount,
      successfulProductScrapeCount,
      failedProductScrapeCount,
      duration,
    });
    return true;
  } catch (error) {
    return false;
  }
};
