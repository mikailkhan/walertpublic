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
  const officialErrorMessage =
    error instanceof Error ? error.message : undefined;

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
