import { Router } from "express";
import {
  getVerification,
  recieveMessage,
} from "../controllers/whatsappController";

const whatsappRouter = Router();

// WEBHOOKS -> Recieve messages
whatsappRouter.get("/", getVerification);
whatsappRouter.post("/", recieveMessage);

export default whatsappRouter;
