import express, { Request, Response } from "express";
import { startNormalScraper, startPuppeteerScraper } from "./scraper/main";
import whatsappRouter from "./routes/whatsapp";
import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "./configs/config";

export const createApp = () => {
  const app = express();
  const db = drizzle({ connection: DATABASE_URL!, casing: "snake_case" });

  app.use(express.json());
  app.use(express.urlencoded());

  // Routes
  app.use(`/api/v1/whatsapp`, whatsappRouter);

  return app;
};
