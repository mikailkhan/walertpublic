import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { productsTable, scraperLimitTable, usersTable } from "../db/schema";
import { getSupportedWebsite } from "./adminModel";

export const createNewUser = async ({
  fullName,
  number,
}: {
  number: string;
  fullName: string;
}) => {
  try {
    const user = await db
      .insert(usersTable)
      .values({ fullName: fullName, number: number })
      .returning({ userId: usersTable.userId });

    await db.insert(scraperLimitTable).values({ userId: user[0].userId });
  } catch (error) {
    console.error(error instanceof Error ? error.message : "somethig other");
  }
};

export const getUser = async (number: string) => {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.number, number));

    return user[0];
  } catch (error) {
    console.error(error instanceof Error ? error.message : "somethig other");
    return;
  }
};

export const addProductTracker = async ({
  number,
  website,
  productName,
  link,
  originalPrice,
}: {
  number: string;
  website: string | undefined;
  productName: string;
  link: string;
  originalPrice: number;
}): Promise<boolean> => {
  try {
    const supportedWebsite = await getSupportedWebsite(website);
    const user = await getUser(number);

    const userId = user?.userId;
    const websiteId = supportedWebsite?.websiteId;
    const currentPrice = originalPrice;

    await db
      .insert(productsTable)
      .values({
        userId,
        websiteId,
        originalPrice,
        link,
        productName,
        currentPrice,
      });

    return true;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "error in product adding"
    );
    return false;
  }
};
