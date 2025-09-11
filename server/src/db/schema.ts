import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  userId: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  fullName: varchar({ length: 255 }),
  number: varchar({ length: 13 }).unique(),
  createdAt: timestamp().defaultNow(),
});

export const scraperLimitTable = pgTable("scraper_limit", {
  scraperLimitId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  scraperTotalLimit: integer().default(2).notNull(),
  scraperCurrentLimit: integer().default(0).notNull(),
  userId: integer().references(() => usersTable.userId, {
    onDelete: "cascade",
  }),
});

export const websiteTable = pgTable("websites", {
  websiteId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  website: text().notNull(),
  priceSelector: text().notNull(),
  productNameSelector: text().notNull(),
  active: boolean().default(true),
  scraperModule: text(),
});

export const admin = pgTable("admin", {
  adminId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  username: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 100 }),
});

export const productsTable = pgTable("products", {
  productId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  productName: text(),
  link: text(),
  currentPrice: integer(),
  originalPrice: integer().notNull(),
  userId: integer().references(() => usersTable.userId, {
    onDelete: "cascade",
  }),
  websiteId: integer().references(() => websiteTable.websiteId),
});

export const messagesReceivedTable = pgTable("messages_received", {
  receivedMessageId: integer().primaryKey().generatedAlwaysAsIdentity({
    startWith: 1,
  }),
  receivedText: text().notNull(),
  recievedAt: timestamp().defaultNow().notNull(),
  recievedFrom: text(),
  messageId: integer(),
  userid: integer()
    .references(() => usersTable.userId, { onDelete: "cascade" })
    .notNull(),
});

export const messagesSentTable = pgTable("message_sent", {
  sentMessageId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1 }),
  sentText: text(),
  sentTo: text(),
  sentAt: timestamp().defaultNow(),
  userid: integer().references(() => usersTable.userId, {
    onDelete: "cascade",
  }),
});

export const errorsLogTable = pgTable("error_message", {
  errorId: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  type: text().notNull(),
  errorMessage: text().notNull(),
  messageId: text(),
});
