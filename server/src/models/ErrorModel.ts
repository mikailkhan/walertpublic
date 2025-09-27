import { count, eq } from "drizzle-orm";
import { db } from "../db/db";
import { errorsLogTable } from "../db/schema";

export const logError = async ({
  type,
  officialErrorMessage,
  customErrorMessage,
  messageId,
}: {
  type: string;
  officialErrorMessage?: string;
  customErrorMessage?: string;
  messageId?: string;
}) => {
  await db
    .insert(errorsLogTable)
    .values({ type, officialErrorMessage, customErrorMessage, messageId });
};

export const getAllErrors = async () => {
  try {
    const result = await db.select().from(errorsLogTable);
    return result;
  } catch (error) {
    return;
  }
};

export const getTotalErrors = async (ERROR_TYPE?: string) => {
  try {
    let result;

    if (ERROR_TYPE === undefined) {
      [result] = await db.select({ count: count() }).from(errorsLogTable);
    } else {
      [result] = await db
        .select({ count: count() })
        .from(errorsLogTable)
        .where(eq(errorsLogTable.type, ERROR_TYPE));
    }

    return result.count;
  } catch (error) {
    return;
  }
};
