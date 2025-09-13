import { getAllSupportedWebsites } from "../../models/adminModel";
import { sendReplyMessage, sendTextMessage } from "./SendMessage";

/**
 *
 * Template.ts only contains messages templates that have multiple variables or some logic.
 * Avoid reduntant messages.
 */

/**
 * Handles the event triggered when a user submits a valid URL from a supported site.
 * After successfully inserting the product into the database, this template is invoked.
 *
 * @param {Object} params - The parameter object.
 * @param {string} params.receiver - The phone number or identifier of the person receiving the message.
 * @param {string} params.productName - The name of the product.
 * @param {number} params.originalPrice - The original price of the product before any discounts or modifications.
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

/**
 * Sends the list of supported websites to the user.
 * This function is triggered when the user provides a product URL from an unsupported site.
 *
 * @param {Object} params - The parameter object.
 * @param {string} params.reciever - The phone number or identifier of the user receiving the message.
 * @param {number} params.message_id - The unique identifier of the message associated with the request.
 *
 * @returns {Promise<void>} A promise that resolves once the message has been sent.
 */

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

/**
 * Sends a helper message to the user.
 * If a `messageId` is provided, it invokes `sendReplyMessage`;
 * otherwise, it calls `sendTextMessage` with a default help text.
 *
 * @param {Object} params - The parameter object.
 * @param {string} params.number - The phone number or identifier of the user receiving the message.
 * @param {number} [params.messageId] - Optional. The ID of the message to reply to.
 * If omitted, a standard helper text message will be sent instead.
 *
 * @returns {Promise<void>} A promise that resolves once the helper message has been sent.
 */

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
