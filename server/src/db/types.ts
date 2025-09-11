import { productsTable, usersTable } from "./schema";

export type ProductType = typeof productsTable.$inferSelect;
