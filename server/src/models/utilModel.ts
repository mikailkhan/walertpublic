import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { scraperLimitTable, usersTable, websiteTable } from "../db/schema";

export const isNewUser = async ({
  number,
}: {
  number: string;
}): Promise<boolean> => {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.number, number));

  if (result.length > 0) {
    return false;
  } else {
    return true;
  }
};

export const isTrackerLimitHit = async (number: string) => {
  try {
    const result = await db
      .select({
        currentLimit: scraperLimitTable.scraperCurrentLimit,
        totalLimit: scraperLimitTable.scraperTotalLimit,
      })
      .from(scraperLimitTable)
      .leftJoin(usersTable, eq(scraperLimitTable.userId, usersTable.userId))
      .where(eq(usersTable.number, number));

    return result[0].currentLimit === result[0].totalLimit ? true : false;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "somethig oter");
    return null;
  }
};

export const isWebsiteSupported = async (
  website: string | undefined
): Promise<boolean | null> => {
  try {
    if (!website) {
      return null;
    }

    const result = await db
      .select()
      .from(websiteTable)
      .where(eq(websiteTable.website, website));

    return result.length > 0 ? true : false;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "somethig oter");
    return null;
  }
};
