import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { productsTable, websiteTable } from "../db/schema";

export const getProduct = async (id: number) => {
  try {
    const [result] = await db
      .select({
        productTitle: productsTable.productName,
        url: productsTable.link,
        oldPrice: productsTable.originalPrice,
        website: websiteTable.website,
      })
      .from(productsTable)
      .innerJoin(
        websiteTable,
        eq(websiteTable.websiteId, productsTable.websiteId)
      )
      .where(eq(productsTable.productId, id));

    if (result) {
      return result;
    }
    return;
  } catch (error) {
    return;
  }
};
