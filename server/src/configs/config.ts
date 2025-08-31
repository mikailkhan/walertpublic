import { config } from "dotenv";

const env = process.env;

// SERVER SETUP

export const SERVER_PORT: number = Number(env.SERVER_PORT) ?? 3000;
export const HOST = env.HOST ?? `0.0.0.0`;

// STATUSES

export const SUCCESS_STATUS = "successful";
export const FAILED_STATUS = "failed";
