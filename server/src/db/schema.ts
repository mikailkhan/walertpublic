import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { string } from "joi";

export const usersTable = pgTable("users", {
  userId: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  fullName: varchar({ length: 255 }),
  number: varchar({ length: 13 }).unique().notNull(),
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

export const adminTable = pgTable("admin", {
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
  productName: text().notNull(),
  link: text().notNull(),
  currentPrice: integer(),
  originalPrice: integer().notNull(),
  userId: integer().references(() => usersTable.userId, {
    onDelete: "cascade",
  }),
  websiteId: integer().references(() => websiteTable.websiteId),
  createdAt: timestamp().defaultNow().notNull(),
});

export const productsScrapeTable = pgTable("product_scrape", {
  productScrapeId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  productId: integer()
    .references(() => productsTable.productId, { onDelete: "cascade" })
    .notNull(),
  status: varchar({ length: 255 }),
  lastScrape: timestamp(),
});

export const messagesReceivedTable = pgTable("messages_received", {
  receivedMessageId: integer().primaryKey().generatedAlwaysAsIdentity({
    startWith: 1000,
  }),
  receivedText: text().notNull(),
  recievedAt: timestamp().defaultNow().notNull(),
  recievedFrom: text(),
  type: text(),
  messageId: text(),
  userid: integer()
    .references(() => usersTable.userId, { onDelete: "cascade" })
    .notNull(),
});

export const messagesSentTable = pgTable("message_sent", {
  sentMessageId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  sentText: text(),
  sentTo: text(),
  sentAt: timestamp().defaultNow(),
  type: text(),
  userid: integer().references(() => usersTable.userId, {
    onDelete: "cascade",
  }),
});

export const errorsLogTable = pgTable("error_message", {
  errorId: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  type: text().notNull(),
  officialErrorMessage: text(),
  customErrorMessage: text(),
  messageId: text(),
});

export const getMoreTrackerTable = pgTable("more_trackers_requests", {
  reqId: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  userid: integer().references(() => usersTable.userId, {
    onDelete: "cascade",
  }),
  req: boolean().notNull(),
});

export const cronLoggerTable = pgTable("cron_job_logger", {
  cronId: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  successfulProductScrapeCount: integer().notNull(),
  failedProductScrapeCount: integer().notNull(),
  overallProductScrapeCount: integer().notNull(),
  startedAt: timestamp().defaultNow(),
  duration: text(),
});
