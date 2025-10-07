import express, { Request, Response } from "express";
import whatsappRouter from "./routes/whatsapp";
import adminRouter from "./routes/admin";
import { testDBConnection } from "./db/db";
import cors from "cors";
import cron from "node-cron";
import scrapeTask from "./cron_tasks/scrapetask";
import { ADMIN_URL } from "./configs/config";
import { strategy } from "./middleware/Auth";
import passport from "passport";
import productRouter from "./routes/product";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());
  app.use(passport.initialize());
  app.use(cors());

  // Authentication
  passport.use(strategy());

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
    `/api/v1${ADMIN_URL}`,
    (req: Request, res: Response, next) => {
      next();
    },
    adminRouter
  );

  app.use(
    `/api/v1/product`,
    (req: Request, res: Response, next) => {
      next();
    },
    productRouter
  );

  // cron jobs
  // cron.schedule("*/5 * * * * *", scrapeTask);
  // At every minute past every 12th hour.
  cron.schedule("* */12 * * *", scrapeTask);

  return app;
};
