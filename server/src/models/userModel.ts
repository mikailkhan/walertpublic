import { eq, getTableColumns } from "drizzle-orm";
import { db } from "../db/db";
import { productsTable, scraperLimitTable, usersTable } from "../db/schema";
import { getSupportedWebsite } from "./adminModel";
import { isTrackerLimitHit } from "./utilModel";
import { ProductType } from "../db/types";

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
    console.error(
      error instanceof Error
        ? `Error in creating new user: ${error.message}`
        : "Error in creating new user"
    );
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
    console.error(
      error instanceof Error
        ? `Error in getting user: ${error.message}`
        : "Error in getting user"
    );
    return;
  }
};

export const updateCurrentTrackerLimit = async (
  userId: number | undefined,
  add: boolean = true
) => {
  try {
    if (!userId) {
      return false;
    }
    const tracker = await db
      .select({ currentLimit: scraperLimitTable.scraperCurrentLimit })
      .from(scraperLimitTable)
      .where(eq(scraperLimitTable.userId, userId));

    let updatedCurrentLimit: number = tracker[0].currentLimit;

    if (add) {
      updatedCurrentLimit += 1;
    } else {
      if (tracker[0].currentLimit > 0) {
        updatedCurrentLimit -= 1;
      }
    }

    await db
      .update(scraperLimitTable)
      .set({ scraperCurrentLimit: updatedCurrentLimit })
      .where(eq(scraperLimitTable.userId, userId));

    return true;
  } catch (error) {
    console.error(
      error instanceof Error
        ? `Error in updating current tracker: ${error.message}`
        : "Error in updating current tracker"
    );
    return false;
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
    if (await isTrackerLimitHit(number)) {
      return false;
    }

    const supportedWebsite = await getSupportedWebsite(website);
    const user = await getUser(number);

    const userId = user?.userId;
    const websiteId = supportedWebsite?.websiteId;
    const currentPrice = originalPrice;

    await db.insert(productsTable).values({
      userId,
      websiteId,
      originalPrice,
      link,
      productName,
      currentPrice,
    });

    await updateCurrentTrackerLimit(userId);

    return true;
  } catch (error) {
    console.error(
      error instanceof Error
        ? `Error in adding product: ${error.message}`
        : "error in adding product"
    );
    return false;
  }
};

export const getAllTrackers = async (number: string) => {
  try {
    const result: ProductType[] = await db
      .select({ ...getTableColumns(productsTable) })
      .from(productsTable)
      .innerJoin(usersTable, eq(productsTable.userId, usersTable.userId))
      .where(eq(usersTable.number, number));

    return result;
  } catch (error) {
    const errorMessage = "Error in fetching all trackers from database";
    console.error(
      error instanceof Error ? `${errorMessage}: error.message` : errorMessage
    );
    return;
  }
};

export const deleteUser = async (number: string): Promise<boolean> => {
  try {
    await db.delete(usersTable).where(eq(usersTable.number, number));
    return true;
  } catch (error) {
    const errorMessage = "Error in deleting the user";
    console.error(
      error instanceof Error
        ? `Error in DeleteUser: ${error.message}`
        : errorMessage
    );
    return false;
  }
};

export const deleteTracker = async (productId: number, number: string) => {
  try {
    const user = await getUser(number);

    await db
      .delete(productsTable)
      .where(eq(productsTable.productId, productId));

    await updateCurrentTrackerLimit(user?.userId, false);
    return true;
  } catch (error) {
    const errorMessage = "Error in deleting tracker from database";
    console.error(error instanceof Error ? error.message : errorMessage);
    return;
  }
};
