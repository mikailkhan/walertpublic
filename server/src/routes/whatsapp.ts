import { Router } from "express";
import {
  sendTemplateMessage,
  sendTextMessage,
} from "../controllers/whatsappController";

const whatsappRouter = Router();

whatsappRouter.get("/template", sendTemplateMessage);
whatsappRouter.get("/text", sendTextMessage);

export default whatsappRouter;
