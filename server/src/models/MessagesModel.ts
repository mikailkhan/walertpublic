import { eq } from "drizzle-orm";
import { db } from "../db/db";
import {
  messagesReceivedTable,
  messagesSentTable,
  usersTable,
} from "../db/schema";

export const logRecievedMessage = async ({
  receivedText,
  recievedFrom,
  messageId,
  type,
}: {
  receivedText: string;
  recievedFrom: string;
  messageId: string;
  type: string;
}) => {
  try {
    const user = await db
      .select({ userId: usersTable.userId })
      .from(usersTable)
      .where(eq(usersTable.number, recievedFrom));

    await db.insert(messagesReceivedTable).values({
      receivedText,
      recievedFrom,
      messageId,
      userid: user[0].userId,
      type,
    });
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "Error in logging recieved message"
    );
    return;
  }
};

export const logSentMessages = async ({
  sentText,
  sentTo,
  type,
}: {
  sentText: string;
  sentTo: string;
  type: string;
}) => {
  try {
    const user = await db
      .select({ userId: usersTable.userId })
      .from(usersTable)
      .where(eq(usersTable.number, sentTo)); // gets user id based on whom the message was sent

    await db.insert(messagesSentTable).values({
      sentText,
      sentTo,
      type,
      userid: user[0].userId,
    });
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Error in logging sent message"
    );
    return;
  }
};
