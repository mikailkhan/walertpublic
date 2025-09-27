import { ERROR_TYPE } from "../../configs/errorConfig";
import { logRecievedMessage } from "../../models/MessagesModel";
import { logMoreTrackerReq } from "../../models/MoreTrackerModel";
import {
  deleteTracker,
  deleteUser,
  getAllTrackersOfUser,
} from "../../models/userModel";
import { Message } from "../../types/Message";
import { ErrorLogger } from "../../util/ErrorLogger";
import {
  sendDeleteConfrimMessage,
  sendTextMessage,
  sendTrackerListForDeletion,
} from "./SendMessage";

/**
 * HandleList provides functions that are executed after requesting a list
 * (e.g., a Menu list or a Tracker deletion list).
 * Each function contains the logic to process and handle the corresponding request.
 */

/**
 * Handles the Menu message list
 * @param {Message} messages -  Object that contains info regarding the recieved message.
 */
export const handleListReply = async ({
  messages,
}: {
  messages: Message;
}): Promise<void> => {
  if (messages.interactive) {
    if (messages.interactive.type === "list_reply") {
      const listReplyId = messages.interactive.list_reply.id;
      const number = messages.from;
      const listReplyTitle = messages.interactive.list_reply.title;

      await logRecievedMessage({
        receivedText: listReplyTitle,
        messageId: messages.id.toString(),
        recievedFrom: messages.from,
        type: "list_reply",
      });

      await ListReply(listReplyId, number);
    }
  }
};

/**
 * This function handles each list reply individually.
 *
 * At the moment three cases are handled when a user clicks on:
 *
 * First case: Reply from menu list.
 * Second case: Reply from delete user confirmation list which is Yes/No.
 * Third case: Reply from delete tracker list.
 *
 * @param listReplyId - reply id recieved from user after clicking on one of the options.
 * @param number - user's number.
 * @returns {Promise<void>} a promise that resolves once individual action is taken.
 */
const ListReply = async (listReplyId: string, number: string) => {
  const data = { listReplyId, number };
  if (await handleMainMenu(data)) {
    return;
  } else if (await handleDeleteUserConfirmation(data)) {
    return;
  } else if (await handleDeleteTrackerReply(data)) {
    return;
  } else {
    return;
  }
};

// ########################################
// Main Handler functions
// ########################################

/**
 * Handles a user's response to main menu buttons.
 * Determines the action to take based on the option selected by the user.
 *
 * @param {Object} params - The parameter object.
 * @param {string} params.listReplyId - The reply ID received from the user after clicking one of the menu options.
 * @param {string} params.number - The phone number or identifier of the user.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the response was successfully handled.
 */
const handleMainMenu = async ({
  listReplyId,
  number,
}: {
  listReplyId: string;
  number: string;
}): Promise<boolean> => {
  if (listReplyId === "get_all_trackers") {
    await handleGetAllTrackers(number);
    return true;
  } else if (listReplyId === "delete_tracker") {
    await handleDeleteTracker(number);
    return true;
  } else if (listReplyId === "get_more_trackers") {
    await handleGetMoreTrackers(number);
    return true;
  } else if (listReplyId === "delete_profile") {
    await sendDeleteConfrimMessage({ reciever: number });
    return true;
  } else {
    return false;
  }
};

/**
 * Handles a user's response to Delete Confirmation [yes/no] buttons.
 * Determines the action to take based on the option selected by the user.
 *
 * @param {Object} params - The parameter object.
 * @param {string} params.listReplyId - The reply ID received from the user after clicking one of the menu options.
 * @param {string} params.number - The phone number or identifier of the user.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the response was successfully handled.
 */
const handleDeleteUserConfirmation = async ({
  listReplyId,
  number,
}: {
  listReplyId: string;
  number: string;
}): Promise<boolean> => {
  if (listReplyId === "delete_yes") {
    if (await deleteUser(number)) {
      await sendTextMessage({
        reciever: number,
        messageText: `Your account has been deleted. Thanks for being with us — we'd love to see you again in the future! 💙`,
      });
    }
    return true;
  } else if (listReplyId === "delete_no") {
    await sendTextMessage({
      reciever: number,
      messageText: `Thank you for staying with us 💓`,
    });
    return true;
  } else {
    return false;
  }
};

/**
 * Handles a user's response to delete tracker lists buttons.
 * Determines the action to take based on the option selected by the user.
 *
 * @param {Object} params - The parameter object.
 * @param {string} params.listReplyId - The reply ID received from the user after clicking one of the menu options.
 * @param {string} params.number - The phone number or identifier of the user.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the response was successfully handled.
 */
const handleDeleteTrackerReply = async ({
  listReplyId,
  number,
}: {
  listReplyId: string;
  number: string;
}): Promise<boolean> => {
  const trackersList = await getAllTrackersOfUser(number);

  trackersList?.forEach(async (val) => {
    if (listReplyId === val.productId.toString()) {
      const productName = val.productName;

      if (await deleteTracker(val.productId, number)) {
        await sendTextMessage({
          reciever: number,
          messageText: `Your tracker *[${productName}]* has been deleted successfully! Want to add another one? Just send us the URL 🔗`,
        });
      } else {
        await sendTextMessage({
          reciever: number,
          messageText: `Oops! Something went wrong. We couldn't delete the [${productName}] tracker at the moment. Please try again later.`,
        });

        await ErrorLogger({
          type: ERROR_TYPE.GENERAL,
          customErrorMessage: `User [${val.userId}] req to delete ${val.productId} was failed.`,
        });
      }

      return true;
    }
  });

  return false;
};

// ########################################
// Helper functions for main handlers.
// ########################################

/**
 * Sends a tracker list to the user so they can select which tracker to delete.
 * This function is used internally by `handleMainMenu`.
 *
 * @param {string} number - The phone number or identifier of the user.
 *
 * @returns {Promise<void>} A promise that resolves once the tracker list has been sent.
 */
const handleDeleteTracker = async (number: string) => {
  const trackers = await getAllTrackersOfUser(number);
  if (trackers) {
    await sendTrackerListForDeletion({ reciever: number, trackers });
  }
};

/**
 * Logs a request from a user who wants to increase their tracker limit.
 * Also sends a confirmation message to indicate that the request has been received.
 *
 * @param {string} number - The phone number or identifier of the user.
 *
 * @returns {Promise<void>} A promise that resolves once the request has been logged and the confirmation message has been sent.
 */
const handleGetMoreTrackers = async (number: string) => {
  let messageText: string;

  if ((await logMoreTrackerReq(number)) === true) {
    messageText = `You said, we heard. We are working on this functionality to get you more trackers.`;
  } else {
    messageText = `We've already noted your request for this feature, and our team is working on adding more trackers 🚀 Thanks for your patience while we make it happen!`;
  }

  await sendTextMessage({
    reciever: number,
    messageText,
  });

  return;
};

/**
 * Sends a text message containing a list of active trackers the user has set.
 * Triggered when the user selects **Get All Trackers** from the main menu.
 *
 * @param {string} number - The phone number or identifier of the user.
 *
 * @returns {Promise<void>} A promise that resolves once the list of active trackers has been sent.
 */
const handleGetAllTrackers = async (number: string) => {
  const trackersList = await getAllTrackersOfUser(number);

  await sendTextMessage({
    reciever: number,
    messageText: `Your All trackers: 
${trackersList?.map((val, index) => {
  return `

*${index + 1}. ${val.productName}*
Original Price: PKR ${val.originalPrice}
${val.link}`;
})}
    
_Walert.pk at your service 😊_
`,
  });
};
