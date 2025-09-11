import { ORMResponse } from "../types/ORM";

export const customError = (
  errorMessage: string,
  error: unknown
): ORMResponse<undefined> => {
  console.error(error instanceof Error ? error.message : errorMessage);
  return { succuss: false, errorMessage };
};
