import {
  integer,
  pgTable,
  varchar,
  text,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  userId: integer().primaryKey(), // -> number of the user whatsapp
  fullName: varchar({ length: 255 }),
  scraperLimit: integer().default(2).notNull(),
  createdAt: timestamp().defaultNow(),
});

export const websiteTable = pgTable("websites", {
  websiteId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  website: text().notNull(),
  priceSelector: text().notNull(),
  productNameSelector: text().notNull(),
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
