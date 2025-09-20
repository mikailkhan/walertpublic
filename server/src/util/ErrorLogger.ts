import { logError } from "../models/ErrorModel";

export const ErrorLogger = async ({
  type,
  error,
  customErrorMessage,
  messageId,
  consoleLog,
}: {
  type: string;
  error?: unknown;
  customErrorMessage?: string;
  messageId?: string;
  consoleLog?: boolean;
}) => {
  let officialErrorMessage: string;

  if (error && typeof error === "object" && "response" in error) {
    const whatsappErrorMessage = (error as any).response.data.error.message;
    officialErrorMessage = whatsappErrorMessage && whatsappErrorMessage;
  } else {
    officialErrorMessage =
      error instanceof Error ? error.message : "Unknown error";
  }

  logError({
    type,
    officialErrorMessage,
    customErrorMessage,
    messageId,
  });

  if (consoleLog) {
    if (officialErrorMessage) {
      console.error(`Error: ${officialErrorMessage}\n`);
    }

    if (customErrorMessage) {
      console.error(`Details: ${customErrorMessage}\n`);
    }
  }
};
