import {
  deleteTracker,
  deleteUser,
  getAllTrackers,
} from "../../models/userModel";
import { Message } from "../../types/Message";
import { sendTextMessage } from "./SendMessage";
import { sendTrackerListForDeletion } from "./Templates";

export const handleMenuListReply = async ({
  messages,
}: {
  messages: Message;
}): Promise<void> => {
  if (messages.interactive) {
    if (messages.interactive.type === "list_reply") {
      const listReplyId = messages.interactive.list_reply.id;
      const number = messages.from;
      // const listReplyTitle = messages.interactive.list_reply.title;

      await menuListReply(listReplyId, number);
    }
  }
};

const menuListReply = async (listReplyId: string, number: string) => {
  if (listReplyId === "get_all_trackers") {
    await handleGetAllTrackers(number);
  } else if (listReplyId === "delete_tracker") {
    await handleDeleteTracker(number);
  } else if (listReplyId === "update_profile_name") {
    await handleUpdateProfile(number);
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
  await sendTextMessage({
    reciever: number,
    messageText: `You said, we heard. We are working on this functionality to get you more trackers.`,
  });
};

const handleUpdateProfile = async (number: string) => {
  await sendTextMessage({
    reciever: number,
    messageText: `*✏️ Could you please share your name so we can update it for you?*
Please use the format:
\`name=YourName\`
For example: name=Khan`,
  });
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
