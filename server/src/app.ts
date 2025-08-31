import express, { Request, Response } from "express";
import { startNormalScraper, startPuppeteerScraper } from "./scraper/main";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  // Routes
  app.use(`/api/v1/whatsapp`);

  return app;
};
