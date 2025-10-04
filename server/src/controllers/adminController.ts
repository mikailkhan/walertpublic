import { Request, Response } from "express";
import {
  addSupportedWebsite,
  createAdmin,
  getAllSupportedWebsites,
  isFirstAdmin,
  loginAdmin,
} from "../models/adminModel";
import { domainExtract } from "../scraper/util/util";
import { startScraper } from "../scraper/main";
import { getAllUsers, getTotalUsers } from "../models/userModel";
import {
  getAllRecievedMessages,
  getAllSentMessages,
  getTotalMessagesRecieved,
  getTotalMessagesSent,
} from "../models/MessagesModel";
import {
  getAllTrackers,
  getTotalTrackersPlaced,
  getTotalWebsites,
} from "../models/ScrapeModel";
import {
  getAllTrackersRequests,
  getTotalTrackerRequests,
} from "../models/MoreTrackerModel";
import { getAllErrors, getTotalErrors } from "../models/ErrorModel";
import { ERROR_TYPE } from "../configs/errorConfig";
import { loginSchema, registrationSchema } from "../util/ValidationSchema";
import {
  ADMIN_SECRET_KEY,
  FAILED_STATUS,
  SUCCESS_STATUS,
} from "../configs/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* Util Functions */
async function hashPassword(plainPassword: string) {
  return await bcrypt.hash(plainPassword, 10);
}

// ADMIN SECTION

export const handleAdminExists = async (req: Request, res: Response) => {
  if (await isFirstAdmin()) {
    return res.json({ adminExists: false });
  } else {
    return res.json({ adminExists: true });
  }
};

export const handleAdminRegistration = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    const { error } = registrationSchema.validate({
      username,
      password,
      email,
    });

    // if validation fails.
    if (error) {
      return res.json({ status: FAILED_STATUS, message: error.message });
    }

    if (!(await isFirstAdmin())) {
      return res.json({
        status: FAILED_STATUS,
        message: "Admin account already exists. New admin cannot be created.",
      });
    }

    // if everything is fine create new user and sign token
    const newUser = await createAdmin({
      username,
      password: await hashPassword(password),
      email,
    });

    // if user was created
    if (newUser?.status === SUCCESS_STATUS && "adminId" in newUser) {
      const token = jwt.sign({ sub: newUser.adminId }, ADMIN_SECRET_KEY!);
      return res.status(201).json({
        status: SUCCESS_STATUS,
        message: "Registration successful",
        id: newUser?.adminId,
        token,
      });
    } else {
      return res.status(201).json({
        status: FAILED_STATUS,
        message: newUser?.message,
      });
    }
  } catch (err) {
    const errorMessage = err instanceof Error && err.message;
    return res.json({ status: FAILED_STATUS, message: errorMessage });
  }
};

export const handleAdminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const { error } = loginSchema.validate({ username, password });

    if (error) {
      // if invalid result
      return res.json({ status: FAILED_STATUS, message: error.message });
    }

    const result = await loginAdmin({
      username,
      password,
    });

    // if user was not found or incorrect password
    if (result?.status === FAILED_STATUS) {
      return res.json({ status: FAILED_STATUS, message: result?.message });
    }

    // if user was found and verified
    if (result && "adminId" in result) {
      const token = jwt.sign({ sub: result.adminId }, ADMIN_SECRET_KEY!);
      return res.json({
        status: SUCCESS_STATUS,
        message: "Logged in successfully",
        token,
      });
    }
  } catch (err) {
    console.error(`Error in Login: ${err instanceof Error && err.message}`);
  }
};

export const handleAdminAuthValidation = async (
  req: Request,
  res: Response
) => {
  return res.json({ loggedIn: true, user: req.user });
};

const handleUpdateUsername = async (req: Request, res: Response) => {};

const handleUpdatePassword = async (req: Request, res: Response) => {};

const handleUpdateEmail = async (req: Request, res: Response) => {};

/**
 * Adds a website to the database by the admin.
 * Becuase of policies Only supported websites can be scraped; unsupported sites are ignored.
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>} Sends a response to the client
 */

export const handleAddSupportedWebsite = async (
  req: Request,
  res: Response
) => {
  try {
    const { url, priceSelector, productNameSelector } = req.body;

    if (
      url.length === 0 ||
      priceSelector.length === 0 ||
      productNameSelector.length === 0
    ) {
      return res.status(400).json({
        errorMessage:
          "URL, Price Selector, and Product Name Selector can't be empty",
      });
    }

    // test our url so if error occurs we don't add it to our supported websites tables for tracking
    const testURL = await startScraper(url, priceSelector, productNameSelector);

    if (!testURL.success) {
      return res.status(400).json(testURL);
    }

    const website = domainExtract(url);

    if (!website) {
      return res
        .status(400)
        .json({ errorMessage: "Website can't be extracted." });
    }

    const scraperModule = testURL.module;

    await addSupportedWebsite({
      website,
      priceSelector,
      productNameSelector,
      scraperModule,
    });

    return res.status(200).json(testURL);
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "error in adding website"
    );

    return res
      .status(400)
      .json({ errorMessage: "Something went wrong in supported websites." });
  }
};

/**
 * Dashboard Sections
 */

export const handleDashboard = async (req: Request, res: Response) => {
  const usersCount = await getTotalUsers();
  const messagesSentCount = await getTotalMessagesSent();
  const messagesRecievedCount = await getTotalMessagesRecieved();
  const trackersPlacedCount = await getTotalTrackersPlaced();
  const supportedWebsitesCount = await getTotalWebsites();
  const supportedWebsitesActiveCount = await getTotalWebsites(true);
  const supportedWebsitesNonActiveCount = await getTotalWebsites(false);
  const moreTrackersRequestsCount = await getTotalTrackerRequests();
  const errorsCount = await getTotalErrors();
  const errorsGeneralCount = await getTotalErrors(ERROR_TYPE.GENERAL);
  const errorsInvalidReqCount = await getTotalErrors(
    ERROR_TYPE.INVALID_REQUEST
  );
  const errorsMessageNotSentCount = await getTotalErrors(
    ERROR_TYPE.MESSAGE_NOT_SENT
  );
  const errorsScraperFailedCount = await getTotalErrors(
    ERROR_TYPE.SCRAPER_FAILED
  );
  const errorsTrackerNotDeletedCount = await getTotalErrors(
    ERROR_TYPE.TRACKER_NOT_DELETED
  );
  const errorsUnsupportedSiteReqCount = await getTotalErrors(
    ERROR_TYPE.UNSUPPORTED_WEBSITE_REQ
  );

  return res.status(200).json({
    usersCount,
    messagesSentCount,
    messagesRecievedCount,
    trackersPlacedCount,
    supportedWebsitesCount,
    supportedWebsitesActiveCount,
    supportedWebsitesNonActiveCount,
    moreTrackersRequestsCount,
    errorsCount,
    errorsGeneralCount,
    errorsInvalidReqCount,
    errorsMessageNotSentCount,
    errorsScraperFailedCount,
    errorsTrackerNotDeletedCount,
    errorsUnsupportedSiteReqCount,
  });
};

export const handleMessagesSent = async (req: Request, res: Response) => {
  return res.status(200).json(await getAllSentMessages());
};

export const handleMessagesRecieved = async (req: Request, res: Response) => {
  return res.status(200).json(await getAllRecievedMessages());
};

export const handleMoreTrackerReq = async (req: Request, res: Response) => {
  return res.status(200).json(await getAllTrackersRequests());
};

export const handleAllProducts = async (req: Request, res: Response) => {
  return res.status(200).json(await getAllTrackers());
};

export const handleAllUsers = async (req: Request, res: Response) => {
  return res.status(200).json(await getAllUsers());
};

export const handleAllWebsites = async (req: Request, res: Response) => {
  return res.status(200).json(await getAllSupportedWebsites(null));
};

export const handleAllErrors = async (req: Request, res: Response) => {
  return res.status(200).json(await getAllErrors());
};
