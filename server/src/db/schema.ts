import { integer, pgTable, varchar, text, numeric } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  userId: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  fullName: varchar({ length: 255 }),
  number: varchar({ length: 13 }),
  scraperLimit: integer().default(2),
});

export const websiteTable = pgTable("websites", {
  websiteId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  website: text(),
  priceSelector: text(),
  productNameSelector: text(),
});

export const admin = pgTable("admin", {
  adminId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  username: varchar({ length: 255 }),
  password: varchar({ length: 100 }),
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

export const messagesTable = pgTable("messages", {
  messageId: integer().primaryKey().generatedAlwaysAsIdentity({
    startWith: 1000,
  }),
  message: text(),
  userid: integer().references(() => usersTable.userId),
});
