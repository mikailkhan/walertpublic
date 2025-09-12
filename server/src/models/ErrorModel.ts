import { db } from "../db/db";
import { errorsLogTable } from "../db/schema";

export const logError = async ({
  type,
  errorMessage,
  messageId,
}: {
  type: string;
  errorMessage: string;
  messageId?: string;
}) => {
  await db.insert(errorsLogTable).values({ type, errorMessage, messageId });
};
