import express, { Request, Response } from "express";
import whatsappRouter from "./routes/whatsapp";
import adminRouter from "./routes/admin";
import { testDBConnection } from "./db/db";
import cron from "node-cron";
import scrapeTask from "./cron_tasks/scrapetask";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  // Check DB connection
  testDBConnection();

  // Routes
  app.use(
    `/api/v1/whatsapp`,
    (req: Request, res: Response, next) => {
      next();
    },
    whatsappRouter
  );

  app.use(
    `/api/v1/mkinfo`,
    (req: Request, res: Response, next) => {
      next();
    },
    adminRouter
  );

  // cron jobs
  // cron.schedule("*/5 * * * * *", scrapeTask);

  return app;
};
