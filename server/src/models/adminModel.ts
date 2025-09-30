import { db } from "../db/db";
import { adminTable, websiteTable } from "../db/schema";
import { count, desc, eq } from "drizzle-orm";
import { ErrorLogger } from "../util/ErrorLogger";
import { ERROR_TYPE } from "../configs/errorConfig";
import { FAILED_STATUS, SUCCESS_STATUS } from "../configs/config";
import bcrypt from "bcrypt";

/**
 * Create a new admin
 * @param param0
 * @returns
 */

export const createAdmin = async ({
  username,
  password,
  email,
}: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    const [admin] = await db.select({ count: count() }).from(adminTable);

    if (admin.count !== 0) {
      return { status: FAILED_STATUS, message: "Admin already created." };
    }

    const [response] = await db
      .insert(adminTable)
      .values({ username, password, email })
      .returning();

    return { status: SUCCESS_STATUS, message: "Registered", ...response };
  } catch (error) {
    ErrorLogger({
      type: ERROR_TYPE.DATABASE,
      error,
      consoleLog: true,
      customErrorMessage: "Error in creating admin",
    });
  }
};

export const updatePassword = async (adminId: number, newPassword: string) => {
  try {
    const response = db
      .update(adminTable)
      .set({ password: newPassword })
      .where(eq(adminTable.adminId, adminId));
  } catch (error) {
    ErrorLogger({
      type: ERROR_TYPE.DATABASE,
      error,
      consoleLog: true,
      customErrorMessage: "Error in updating password",
    });
  }
};

export const updateUsername = async (adminId: number, newUsername: string) => {
  try {
    const response = db
      .update(adminTable)
      .set({ username: newUsername })
      .where(eq(adminTable.adminId, adminId));
  } catch (error) {
    ErrorLogger({
      type: ERROR_TYPE.DATABASE,
      error,
      consoleLog: true,
      customErrorMessage: "Error in updating password",
    });
  }
};

export const updateEmail = async (adminId: number, newEmail: string) => {
  try {
    const response = db
      .update(adminTable)
      .set({ username: newEmail })
      .where(eq(adminTable.adminId, adminId));
  } catch (error) {
    ErrorLogger({
      type: ERROR_TYPE.DATABASE,
      error,
      consoleLog: true,
      customErrorMessage: "Error in updating password",
    });
  }
};

export const getAdmin = async ({ adminId }: { adminId: number }) => {
  try {
    const [response] = await db
      .select()
      .from(adminTable)
      .where(eq(adminTable.adminId, adminId));

    return response;
  } catch (error) {
    ErrorLogger({
      type: ERROR_TYPE.DATABASE,
      error,
      consoleLog: true,
      customErrorMessage: "Error in getting admin details",
    });
  }
};

export const loginAdmin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const result = await db
      .select()
      .from(adminTable)
      .where(eq(adminTable.username, username));

    if (result.length === 0) {
      return { status: FAILED_STATUS, message: "User not found." };
    }

    const [adminDetails] = result;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      adminDetails.password
    );

    if (!isPasswordCorrect) {
      return { status: FAILED_STATUS, message: "Password is incorrect." };
    }

    return {
      status: SUCCESS_STATUS,
      message: "Login was successful.",
      ...adminDetails,
    };
  } catch (error) {
    ErrorLogger({
      type: ERROR_TYPE.DATABASE,
      error,
      consoleLog: true,
      customErrorMessage: "Error in logging in",
    });
  }
};

/**
 * Add supported website
 */
export const addSupportedWebsite = async ({
  website,
  priceSelector,
  productNameSelector,
  scraperModule,
}: {
  website: string;
  priceSelector: string;
  productNameSelector: string;
  scraperModule: string;
}) => {
  await db.insert(websiteTable).values({
    website,
    priceSelector,
    productNameSelector,
    scraperModule,
  });

  return;
};

/**
 * Get details of the specific website
 * @param website
 * @returns {object} result
 */
export const getSupportedWebsite = async (website: string | undefined) => {
  try {
    if (!website) {
      return;
    }

    const result = await db
      .select()
      .from(websiteTable)
      .where(eq(websiteTable.website, website));

    return result[0];
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return;
  }
};

/**
 * Get details of all websites according to active status
 *
 * @param {boolean} active - true: all active sites, false: all non-active sites
 * @returns {object} result
 */
export const getAllSupportedWebsites = async (
  active: boolean | null = false
) => {
  try {
    if (active === null) {
      const result = await db
        .select()
        .from(websiteTable)
        .orderBy(desc(websiteTable.websiteId));

      return result;
    }

    const result = await db
      .select()
      .from(websiteTable)
      .where(eq(websiteTable.active, active));

    return result;
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return;
  }
};
