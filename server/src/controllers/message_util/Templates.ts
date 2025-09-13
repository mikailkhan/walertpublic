import { getAllSupportedWebsites } from "../../models/adminModel";
import { sendReplyMessage, sendTextMessage } from "./SendMessage";

/**
 *
 * Template.ts only contains messages templates that have multiple variables or some logic.
 * Avoid reduntant messages.
 */

export const sendTrackerInitialisedMessage = async ({
  reciever,
  productName,
  originalPrice,
}: {
  reciever: string;
  productName: string;
  originalPrice: number;
}) => {
  await sendTextMessage({
    reciever,
    messageText: `*Your tracker has been initialized and is ready to go! 🚀*

- *Product:* ${productName}    
- *Current Price:* PKR ${originalPrice}

_Walert.pk at your service :)_
    `,
  });

  await sendTextMessage({
    reciever,
    messageText: `When price drops we will inform you!`,
  });
};

export const sendListOfSupportedWebsitesMessage = async ({
  reciever,
  message_id,
}: {
  reciever: string;
  message_id: number;
}) => {
  const result = await getAllSupportedWebsites(true); // gets only active = true websites

  await sendReplyMessage({
    reciever: reciever,
    messageText: `
Here is list of supported websites 👉 \n
    ${result?.map((val, index) => {
      return `
${index + 1}. ${val.website}`;
    })}`,
    messageId: message_id,
  });
};

export const sendHelperMessage = async ({
  number,
  messageId,
}: {
  number: string;
  messageId?: number;
}) => {
  if (messageId) {
    await sendReplyMessage({
      reciever: number,
      messageText: `Please provide a product link 🔍 to track, or type \`MENU\` 🏠 for options.`,
      messageId,
    });
  } else {
    await sendTextMessage({
      reciever: number,
      messageText: `Please provide a product link 🔍 to track, or type \`MENU\` 🏠 for options.`,
    });
  }
};
