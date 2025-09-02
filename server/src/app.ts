import express, { Request, Response } from "express";
import { startNormalScraper, startPuppeteerScraper } from "./scraper/main";
import whatsappRouter from "./routes/whatsapp";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  // Routes
  app.use(`/api/v1/whatsapp`, whatsappRouter);

  return app;
};
