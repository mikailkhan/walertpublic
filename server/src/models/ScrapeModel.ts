import { and, eq, getTableColumns, lt, ne, sql } from "drizzle-orm";
import { db } from "../db/db";
import {
  productsScrapeTable,
  productsTable,
  usersTable,
  websiteTable,
} from "../db/schema";
import { SCRAPE_STATUS, SCRAPE_STATUS_TYPE } from "../configs/scrapeConfig";

export const getAllProductsOlderThan = async () => {
  try {
    console.log(`✅ Scraping Job Started`);
    // const twentyFourHoursAgo = sql`NOW() - INTERVAL '24 hours'`;
    const twentyFourHoursAgo = sql`NOW() - INTERVAL '1 minutes'`;

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
