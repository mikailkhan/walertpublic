// SETUP ENV
import { config } from "dotenv";
config();
const env = process.env;

// SERVER SETUP
export const SERVER_PORT = Number(env.SERVER_PORT) ?? 3000;
export const HOST = env.HOST ?? `0.0.0.0`;

// WHATSAPP
export const WHATSAPP_API_KEY = env.WHATSAPP_API_KEY;
export const WHATSAPP_URL = env.WHATSAPP_URL;

// STATUSES
export const SUCCESS_STATUS = "successful";
export const FAILED_STATUS = "failed";
