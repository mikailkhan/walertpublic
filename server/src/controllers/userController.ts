import { addProductTracker, createNewUser } from "../models/userModel";
import {
  isNewUser,
  isTrackerLimitHit,
  isWebsiteSupported,
} from "../models/utilModel";
import { domainExtract } from "../scraper/util/util";
import { startScraper } from "../scraper/main";
import { getSupportedWebsite } from "../models/adminModel";
import {
  sendLimitHitMessage,
  sendListOfSupportedWebsitesMessage,
  sendReplyMessage,
  sendTrackerInitialisedMessage,
} from "./message_util/Templates";
import { isURL } from "./message_util/util";

/**
 * This function stores a new tracker in the database, provided the user has not reached their maximum allowed trackers and the target website is supported.
 *
 * @param {object} params - details of the message
 * @param {string} params.reciever - number of the reciever
 * @param {number} params.message_id - id of the message for reply
 * @param {string} params.url - supported url that for tracking
 * @returns {Promise<void>}
 */
export const addTracker = async ({
  reciever,
  message_id,
  url,
}: {
  reciever: string;
  message_id: number;
  url: string;
}) => {
  if (await isTrackerLimitHit(reciever)) {
    sendLimitHitMessage({ reciever });
    return;
  }

  await sendReplyMessage({
    reciever: reciever,
    messageText: `Thanks for sharing the link! Please hold on while we check if we can support this website.`,
    messageId: message_id,
  });

  const website = domainExtract(url);
  const websiteDetails = await getSupportedWebsite(website); // details like price selector, active status etc

  if (!(await isWebsiteSupported(website)) || !websiteDetails?.active) {
    await sendReplyMessage({
      reciever: reciever,
      messageText: `Sorry, this website isn't supported in our system yet 🙏`,
      messageId: message_id,
    });

    await sendListOfSupportedWebsitesMessage({ reciever, message_id });
    return;
  }

  // these are needed for scraping
  const priceSelector = websiteDetails ? websiteDetails?.priceSelector : "";
  const productNameSelector = websiteDetails
    ? websiteDetails?.productNameSelector
    : "";

  // scraper
  const scraper = await startScraper(url, priceSelector, productNameSelector);
  const productName = scraper.name ? scraper.name : "";
  const originalPrice = scraper.price ? scraper.price : 0;

  // incase the scraper wasn't able to fetch
  if (productName.length === 0 || originalPrice === 0) {
    await sendReplyMessage({
      reciever,
      messageText: `❌ Oops! sorry something went wrong from our side, please try again later.`,
      messageId: message_id,
    });

    return;
  }

  // addProductTracker () returns true on successful insertion to database
  const tracker = await addProductTracker({
    number: reciever,
    website,
    productName,
    link: url,
    originalPrice,
  });

  if (tracker) {
    await sendTrackerInitialisedMessage({
      reciever,
      productName,
      originalPrice,
    });
  }
};

/**
 * Creates a new user if user contacts for the first time.
 *
 * @param {object} params - details of the user
 * @returns {Promise<void>}
 */
export const handleNewUser = async ({
  number,
  fullName,
  message_id,
  text,
}: {
  number: string;
  fullName: string;
  message_id: number;
  text: string;
}) => {
  if (await isNewUser({ number })) {
    await createNewUser({ fullName, number });
    await sendReplyMessage({
      reciever: number,
      messageText: `👋 Hello ${fullName}, welcome to Walert.pk! 🎉 We're excited to have you here.`,
      messageId: message_id,
    });

    if (isURL(text)) {
      addTracker({
        reciever: number,
        message_id: message_id,
        url: text,
      });
    }

    return;
  }
};
