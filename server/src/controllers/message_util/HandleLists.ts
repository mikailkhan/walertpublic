import { ERROR_TYPE } from "../../configs/errorConfig";
import { logError } from "../../models/ErrorModel";
import { logRecievedMessage } from "../../models/MessagesModel";
import { logMoreTrackerReq } from "../../models/MoreTrackerModel";
import {
  deleteTracker,
  deleteUser,
  getAllTrackers,
} from "../../models/userModel";
import { Message } from "../../types/Message";
import { sendTextMessage, sendTrackerListForDeletion } from "./SendMessage";

/**
 * HandleList provides functions that are executed after requesting a list
 * (e.g., a Menu list or a Tracker deletion list).
 * Each function contains the logic to process and handle the corresponding request.
 */

/**
 * Handles the Menu message list
 * @param {Message} messages -  Object that contains info regarding the recieved message.
 */
export const handleMenuListReply = async ({
  messages,
}: {
  messages: Message;
}): Promise<void> => {
  if (messages.interactive) {
    if (messages.interactive.type === "list_reply") {
      const listReplyId = messages.interactive.list_reply.id;
      const number = messages.from;
      const listReplyTitle = messages.interactive.list_reply.title;

      logRecievedMessage({
        receivedText: listReplyTitle,
        messageId: messages.id.toString(),
        recievedFrom: messages.from,
        type: "list_reply",
      });

      await menuListReply(listReplyId, number);
    }
  }
};

const menuListReply = async (listReplyId: string, number: string) => {
  if (listReplyId === "get_all_trackers") {
    await handleGetAllTrackers(number);
  } else if (listReplyId === "delete_tracker") {
    await handleDeleteTracker(number);
  } else if (listReplyId === "get_more_trackers") {
    await handleGetMoreTrackers(number);
  } else if (listReplyId === "delete_profile") {
    await handleDeleteUser(number);
  } else {
    await deleteTrackerReply(listReplyId, number);
  }
};

const deleteTrackerReply = async (listReplyId: string, number: string) => {
  const trackersList = await getAllTrackers(number);

  trackersList?.forEach(async (val) => {
    if (listReplyId === val.productId.toString()) {
      const productName = val.productName;

      if (await deleteTracker(val.productId)) {
        await sendTextMessage({
          reciever: number,
          messageText: `Your tracker *[${productName}]* has been deleted successfully! Want to add another one? Just send us the URL 🔗`,
        });
      } else {
        await sendTextMessage({
          reciever: number,
          messageText: `Oops! Something went wrong. We couldn't delete the [${productName}] tracker at the moment. Please try again later.`,
        });

        await logError({
          type: ERROR_TYPE.TRACKER_NOT_DELETED,
          errorMessage: `User [${val.userId}] req to delete ${val.productId} was failed.`,
        });
      }

      return;
    }
  });
};

const handleDeleteTracker = async (number: string) => {
  const trackers = await getAllTrackers(number);
  if (trackers) {
    await sendTrackerListForDeletion({ reciever: number, trackers });
  }
};

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

const handleDeleteUser = async (number: string) => {
  if (await deleteUser(number)) {
    await sendTextMessage({
      reciever: number,
      messageText: `Your account has been deleted. Thanks for being with us — we'd love to see you again in the future! 💙`,
    });
    return;
  }
};

const handleGetAllTrackers = async (number: string) => {
  const trackersList = await getAllTrackers(number);

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
