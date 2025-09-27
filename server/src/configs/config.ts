// SETUP ENV
import { config } from "dotenv";
config();
const env = process.env;

// SERVER SETUP
export const SERVER_PORT = Number(env.SERVER_PORT) ?? 3000;
export const HOST = env.HOST ?? `0.0.0.0`;

// DATABASE
export const DATABASE_URL = env.DATABASE_URL;

// WHATSAPP
export const WHATSAPP_API_KEY = env.WHATSAPP_API_KEY;
export const WHATSAPP_URL = env.WHATSAPP_URL;
export const WHATSAPP_VERIFY_TOKEN = env.WHATSAPP_VERIFY_TOKEN;

// STATUSES
export const SUCCESS_STATUS = "successful";
export const FAILED_STATUS = "failed";

// Admin
export const ADMIN_URL = env.ADMIN_URL;
