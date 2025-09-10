import { createNewUser } from "../../models/userModel";
import { isNewUser } from "../../models/utilModel";
import { Message } from "../../types/Message";
import { addTracker, handleNewUser } from "../userController";
import { sendMenuMessage, sendReplyMessage, sendTextMessage } from "./Messages";
import { isMenuRequest, isURL } from "./util";

export const handleMenuListReply = async ({
  messages,
}: {
  messages: Message;
}): Promise<void> => {
  if (messages.interactive) {
    if (messages.interactive.type === "list_reply") {
      const listReplyId = messages.interactive.list_reply.id;
      // const listReplyTitle = messages.interactive.list_reply.title;

      if (listReplyId === "get_all_trackers") {
        await sendTextMessage({
          reciever: messages.from,
          messageText: `Your All trackers 1- [exoml.com] 2- [exam.com]`,
        });
      } else if (listReplyId === "delete_tracker") {
        await sendTextMessage({
          reciever: messages.from,
          messageText: `Please select the tracker that you want to delete`,
        });
      } else if (listReplyId === "update_profile_name") {
        await sendTextMessage({
          reciever: messages.from,
          messageText: `✏️ Could you please share your name so we can update it for you?`,
        });
      } else if (listReplyId === "get_more_trackers") {
        await sendTextMessage({
          reciever: messages.from,
          messageText: `We are working on this functionality.`,
        });
      } else if (listReplyId === "delete_profile") {
        await sendTextMessage({
          reciever: messages.from,
          messageText: `Good bye! `,
        });
      }
    }
  }
};

/**
 * Handle text messages of the user
 *
 *
 * @param {object} messages - contains info of the message
 * @param {string} name - name of the user
 * @returns
 */

export const handleTextMessage = async (
  messages: Message,
  name: string
): Promise<void> => {
  const text: string = messages.text ? messages.text.body : "";

  if (await isNewUser({ number: messages.from })) {
    await handleNewUser({
      number: messages.from,
      fullName: name,
      message_id: messages.id,
      text,
    });

    return;
  }

  if (isMenuRequest(text)) {
    await sendMenuMessage({ reciever: messages.from });
  } else {
    if (isURL(text)) {
      // add tracker if text is valid url.
      addTracker({
        reciever: messages.from,
        message_id: messages.id,
        url: text,
      });
    } else {
      // If invalid url
      await sendReplyMessage({
        reciever: messages.from,
        messageText: `❌ Oops! That doesn't look like a valid URL. Please send the correct one 😊 For example: (https://www.example.com/product/macbookpro)`,
        messageId: messages.id,
      });
    }
  }
};
