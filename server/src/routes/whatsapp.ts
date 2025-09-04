import { Router } from "express";
import {
  sendTemplateMessage,
  sendTextMessage,
  getVerification,
  recieveMessage,
} from "../controllers/whatsappController";

const whatsappRouter = Router();

// WEBHOOKS -> Recieve messages
whatsappRouter.get("/", getVerification);
whatsappRouter.post("/", recieveMessage);

// Send Messages
whatsappRouter.get("/template", sendTemplateMessage);
whatsappRouter.get("/text", sendTextMessage);

export default whatsappRouter;
