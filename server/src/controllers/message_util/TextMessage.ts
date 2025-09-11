import { isNewUser } from "../../models/utilModel";
import { Message } from "../../types/Message";
import { addTracker, handleNewUser } from "../userController";
import { sendReplyMessage } from "./SendMessage";
import { sendMenuMessage } from "./Templates";
import { isMenuRequest, isURL } from "./util";

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
