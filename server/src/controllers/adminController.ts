import { Request, Response } from "express";
import {
  addSupportedWebsite,
  getAllSupportedWebsites,
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
 * KPIS Sections
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
