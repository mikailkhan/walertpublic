import express from "express";
import whatsappRouter from "./routes/whatsapp";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  // Routes
  app.use(`/api/v1/whatsapp`, whatsappRouter);

  // app.use(`/api/v1/mkinfo`, whatsappRouter);

  return app;
};
