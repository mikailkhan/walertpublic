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
