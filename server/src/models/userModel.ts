import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { usersTable } from "../db/schema";

export const isNewUser = async ({
  number,
}: {
  number: string;
}): Promise<boolean> => {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.number, number));

  if (result.length > 0) {
    return false;
  } else {
    return true;
  }
};

export const createNewUser = async ({
  fullName,
  number,
}: {
  number: string;
  fullName: string;
}) => {
  try {
    await db.insert(usersTable).values({ fullName: fullName, number: number });
    console.log("User created: ", fullName);
  } catch (error) {
    console.error(error instanceof Error ? error.message : "somethig oter");
  }
};
