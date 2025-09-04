import { integer, pgTable, varchar, text, numeric } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  fullName: varchar({ length: 255 }),
  number: varchar({ length: 13 }),
});

export const websiteTable = pgTable("websites", {
  websiteId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  website: text(),
  priceSelector: text(),
  productNameSelector: text(),
});

export const productsTable = pgTable("products", {
  productId: integer()
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  name: text(),
  link: text(),
  price: numeric({ precision: 10, scale: 2 }),
  userId: integer().references(() => usersTable.id),
  websiteId: text(),
});
