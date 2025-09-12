import axios from "axios";
import { WHATSAPP_API_KEY, WHATSAPP_URL } from "../../configs/config";
import { getAllSupportedWebsites } from "../../models/adminModel";
import { ProductType } from "../../db/types";
import { sendReplyMessage, sendTextMessage } from "./SendMessage";
import { logSentMessages } from "../../models/MessagesModel";

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
