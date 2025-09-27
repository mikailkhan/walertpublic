import { count, eq } from "drizzle-orm";
import { db } from "../db/db";
import { getMoreTrackerTable, usersTable } from "../db/schema";

export const logMoreTrackerReq = async (number: string): Promise<boolean> => {
  try {
    const user = await db
      .select({ id: usersTable.userId })
      .from(usersTable)
      .where(eq(usersTable.number, number));

    if (user.length === 0) {
      return false;
    }

    const request = await db
      .select()
      .from(getMoreTrackerTable)
      .where(eq(getMoreTrackerTable.userid, user[0].id));

    if (request.length != 0) {
      return false;
    }

    await db
      .insert(getMoreTrackerTable)
      .values({ userid: user[0].id, req: true });

    return true;
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "Error in logging get more trackers request"
    );
    return false;
  }
};

export const getTotalTrackerRequests = async () => {
  try {
    const [result] = await db
      .select({ count: count() })
      .from(getMoreTrackerTable);
    return result.count;
  } catch (error) {
    return;
  }
};

export const getAllTrackersRequests = async () => {
  try {
    const result = await db.select().from(getMoreTrackerTable);
    return result;
  } catch (error) {
    return;
  }
};
