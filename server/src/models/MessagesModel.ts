import { count, desc, eq, getTableColumns } from "drizzle-orm";
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
        ? `Error in logging Recieved message: ${error.message}`
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
      userid: user[0]?.userId,
    });
  } catch (error) {
    console.error(
      error instanceof Error
        ? `Error in logging sent message: ${error.message}`
        : "Error in logging sent message"
    );
    return;
  }
};

export const getTotalMessagesSent = async () => {
  try {
    const [result] = await db
      .select({ count: count() })
      .from(messagesSentTable);
    return result.count;
  } catch (error) {
    return;
  }
};

export const getTotalMessagesRecieved = async () => {
  try {
    const [result] = await db
      .select({ count: count() })
      .from(messagesReceivedTable);
    return result.count;
  } catch (error) {
    return;
  }
};

export const getAllRecievedMessages = async () => {
  try {
    const result = await db
      .select({
        ...getTableColumns(messagesReceivedTable),
        username: usersTable.fullName,
      })
      .from(messagesReceivedTable)
      .innerJoin(
        usersTable,
        eq(usersTable.userId, messagesReceivedTable.userid)
      )
      .orderBy(desc(messagesReceivedTable.receivedMessageId));
    return result;
  } catch (error) {
    return;
  }
};

export const getAllSentMessages = async () => {
  try {
    const result = await db
      .select({
        ...getTableColumns(messagesSentTable),
        username: usersTable.fullName,
      })
      .from(messagesSentTable)
      .innerJoin(usersTable, eq(usersTable.userId, messagesSentTable.userid))
      .orderBy(desc(messagesSentTable.sentMessageId));
    return result;
  } catch (error) {
    return;
  }
};
