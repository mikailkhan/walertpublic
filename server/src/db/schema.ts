import {
  integer,
  pgTable,
  varchar,
  text,
  numeric,
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
  userId: integer().references(() => usersTable.userId),
});

export const websiteTable = pgTable("websites", {
  websiteId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  website: text().notNull(),
  priceSelector: text().notNull(),
  productNameSelector: text().notNull(),
  active: boolean().default(true),
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
  name: text(),
  link: text(),
  price: numeric({ precision: 10, scale: 2 }),
  userId: integer().references(() => usersTable.userId),
  websiteId: text(),
});

export const messagesReceivedTable = pgTable("messages_received", {
  receivedMessageId: integer().primaryKey().generatedAlwaysAsIdentity({
    startWith: 1000,
  }),
  receivedText: text().notNull(),
  recievedAt: timestamp().defaultNow().notNull(),
  userid: integer()
    .references(() => usersTable.userId)
    .notNull(),
});

export const messagesSentTable = pgTable("message_sent", {
  sentMessageId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  sentText: text(),
  sentAt: timestamp().defaultNow(),
  userid: integer().references(() => usersTable.userId),
});
