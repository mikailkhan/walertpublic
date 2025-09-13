import axios from "axios";
import { WHATSAPP_API_KEY, WHATSAPP_URL } from "../../configs/config";
import { logSentMessages } from "../../models/MessagesModel";
import { ERROR_TYPE } from "../../configs/errorConfig";
import { ProductType } from "../../db/types";
import { ErrorLogger } from "../../util/ErrorLogger";

// ###############################
// General Send Messages Functions
// ###############################

/**
 * Sends aproved template messages to the user.
 *
 * @param {string} reciever - number of the user
 */

export const sendTemplateMessage = async ({
  reciever,
}: {
  reciever: string;
}) => {
  // data
  // const reciever = "923362601112";
  const templateName = "drop_alert";
  const languageCode = "en";
  const username = "John";
  const productTitle = "Navy Basic Short MN-SHT-SS23-003 A";
  const productID = "123";
  try {
    const response = await axios({
      url: `${WHATSAPP_URL}/messages`,
      method: "post",
      headers: {
        Authorization: `Bearer ${WHATSAPP_API_KEY}`,
        "Content-Type": `application/json`,
      },
      data: {
        messaging_product: "whatsapp",
        to: reciever,
        type: "template",
        template: {
          name: templateName,
          language: { code: languageCode },
          components: [
            {
              type: "header",
              parameters: [
                { type: "text", text: username }, // {{1}} -> Name
              ],
            },
            {
              type: "body",
              parameters: [
                { type: "text", text: productTitle }, // {{2}} -> product_title
              ],
            },
            {
              type: "button",
              sub_type: "url",
              index: "0",
              parameters: [
                { type: "text", text: productID }, // fills {{1}} in button URL
              ],
            },
          ],
        },
      },
    });

    const messageText = `
    Template: ${templateName},
    Product: ${productTitle},
    `;
    await logSentMessages({
      sentText: messageText,
      sentTo: reciever,
      type: "template",
    });
  } catch (error) {
    await ErrorLogger({
      type: ERROR_TYPE.MESSAGE_NOT_SENT,
      error,
      customErrorMessage: `Error in sending template (${templateName} to ${reciever})`,
      consoleLog: true,
    });
  }
};

/**
 * Sends a plain text message to the user.
 *
 * @param {Object} params - The parameter object.
 * @param {string} params.reciever - The phone number or identifier of the user receiving the message.
 * @param {string} params.messageText - The text content of the message to be sent.
 *
 * @returns {Promise<void>} A promise that resolves once the message has been sent.
 */

export const sendTextMessage = async ({
  reciever,
  messageText,
}: {
  reciever: string;
  messageText: string;
}) => {
  try {
    const response = await axios({
      url: `${WHATSAPP_URL}/messages`,
      method: "post",
      headers: {
        Authorization: `Bearer ${WHATSAPP_API_KEY}`,
        "Content-Type": `application/json`,
      },
      data: JSON.stringify({
        messaging_product: "whatsapp",
        to: reciever,
        type: "text",
        text: { body: messageText },
      }),
    });

    await logSentMessages({
      sentText: messageText,
      sentTo: reciever,
      type: "text",
    });
  } catch (error) {
    await ErrorLogger({
      type: ERROR_TYPE.MESSAGE_NOT_SENT,
      error,
      customErrorMessage: `Error in sending text (${messageText} to ${reciever})`,
      consoleLog: true,
    });
  }
};

/**
 * Sends a reply text message to the user.
 *
 * @param {Object} params - The parameter object.
 * @param {string} params.reciever - The phone number or identifier of the user receiving the message.
 * @param {string} params.messageText - The text content of the message to be sent.
 * @param {string} params.messageId - The reference of the message to be replied.
 * @returns {Promise<void>} A promise that resolves once the message has been sent.
 */

export const sendReplyMessage = async ({
  reciever,
  messageText,
  messageId,
}: {
  reciever: string;
  messageText: string;
  messageId: number;
}) => {
  try {
    const response = await axios({
      url: `${WHATSAPP_URL}/messages`,
      method: "post",
      headers: {
        Authorization: `Bearer ${WHATSAPP_API_KEY}`,
        "Content-Type": `application/json`,
      },
      data: JSON.stringify({
        messaging_product: "whatsapp",
        to: reciever,
        type: "text",
        text: { body: messageText },
        context: {
          message_id: messageId,
        },
      }),
    });

    await logSentMessages({
      sentText: messageText,
      sentTo: reciever,
      type: "reply",
    });
  } catch (error) {
    await ErrorLogger({
      error,
      type: ERROR_TYPE.MESSAGE_NOT_SENT,
      customErrorMessage: `Error in sending reply to ${reciever} with text: [${messageText}]`,
      messageId: messageId.toString(),
      consoleLog: true,
    });
  }
};

// ###############################
// Specific cases Send messages.
// ###############################

/**
 * Sends a menu message to the user.
 * Typically used to provide quick action options or navigation choices.
 *
 * @param {Object} params - The parameter object.
 * @param {string} params.reciever - The phone number or identifier of the user receiving the menu message.
 *
 * @returns {Promise<void>} A promise that resolves once the menu message has been sent.
 */
export const sendMenuMessage = async ({ reciever }: { reciever: string }) => {
  try {
    await axios({
      url: `${WHATSAPP_URL}/messages`,
      method: "post",
      headers: {
        Authorization: `Bearer ${WHATSAPP_API_KEY}`,
        "Content-Type": `application/json`,
      },
      data: JSON.stringify({
        messaging_product: "whatsapp",
        to: reciever,
        type: "interactive",
        interactive: {
          type: "list",
          header: {
            type: "text",
            text: "Main Menu",
          },
          body: {
            text: "Please choose from the below options.",
          },
          footer: {
            text: "Walert.pk at your service",
          },
          action: {
            button: "Tap for the options",
            sections: [
              {
                title: "First Section",
                rows: [
                  {
                    id: "get_all_trackers",
                    title: "1. Get All Trackers",
                    description: "Do you want to get a list of your trackers?",
                  },
                  {
                    id: "delete_tracker",
                    title: "2. Delete Tracker",
                    description:
                      "Do you want to delete an existing price tracker?",
                  },
                  {
                    id: "get_more_trackers",
                    title: "3. Get More Trackers 🔥",
                    description:
                      "Do you want to increase your profile tracker limit?",
                  },
                ],
              },
              {
                title: "Second Section",
                rows: [
                  {
                    id: "delete_profile",
                    title: "4. Delete Profile",
                    description:
                      "Do you want to unsubscribe from our services?",
                  },
                ],
              },
            ],
          },
        },
      }),
    });

    await logSentMessages({
      sentText: "Main Menu",
      sentTo: reciever,
      type: "list",
    });
  } catch (error) {
    await ErrorLogger({
      error,
      type: ERROR_TYPE.MESSAGE_NOT_SENT,
      customErrorMessage: `Error in sending MENU to ${reciever}`,
      consoleLog: true,
    });
  }
};

/**
 * Sends a list of trackers that user would like to delete.
 *
 * @param {Object} params - The parameter object.
 * @param {string} params.reciever - The phone number or identifier of the user receiving the menu message.
 * @param {ProductType[]} params.trackers - The trackers list fetched from the database.
 *
 * @returns {Promise<void>} A promise that resolves once the menu message has been sent.
 */
export const sendTrackerListForDeletion = async ({
  reciever,
  trackers,
}: {
  reciever: string;
  trackers: ProductType[];
}) => {
  try {
    const formatLink = (link: string | null) => {
      if (!link) {
        return;
      }
      if (link.length > 66) {
        // because max length of description is 70
        return `${link.trim().slice(0, 65)}...`;
      }

      return link.trim();
    };

    const formatName = (name: string | null) => {
      if (!name) {
        return;
      }
      if (name.length > 21) {
        // because max length of description is 24
        return `${name.trim().slice(0, 17)}...`;
      }

      return name.trim();
    };
    await axios({
      url: `${WHATSAPP_URL}/messages`,
      method: "post",
      headers: {
        Authorization: `Bearer ${WHATSAPP_API_KEY}`,
        "Content-Type": `application/json`,
      },
      data: JSON.stringify({
        messaging_product: "whatsapp",
        to: reciever,
        type: "interactive",
        interactive: {
          type: "list",
          header: {
            type: "text",
            text: "Tracker List",
          },
          body: {
            text: "Please choose the tracker you want to delete.",
          },
          action: {
            button: "Tap for the options",
            sections: [
              {
                title: "List",
                rows: trackers.map((val, index) => {
                  return {
                    id: `${val.productId}`,
                    title: `${index + 1}. ${formatName(val.productName)}`,
                    description: `${formatLink(val.link)}`,
                  };
                }),
              },
            ],
          },
        },
      }),
    });

    await logSentMessages({
      sentText: "Delete Tracker List",
      sentTo: reciever,
      type: "list",
    });
  } catch (error) {
    await ErrorLogger({
      error,
      type: ERROR_TYPE.MESSAGE_NOT_SENT,
      customErrorMessage: `Error in sending Tracker List for Deletion to ${reciever}`,
      consoleLog: true,
    });
  }
};

/**
 * Send a confirmation [yes/no] list to the user before deletion of the user's account.
 *
 * @param {object} params - the parameter object
 * @param {string} params.reciever - The phone number or identifier of the user receiving the menu message.
 *
 * @returns {Promise<void>} returns a promise that resolves once the message is sent.
 */
export const sendDeleteConfrimMessage = async ({
  reciever,
}: {
  reciever: string;
}) => {
  try {
    await axios({
      url: `${WHATSAPP_URL}/messages`,
      method: "post",
      headers: {
        Authorization: `Bearer ${WHATSAPP_API_KEY}`,
        "Content-Type": `application/json`,
      },
      data: JSON.stringify({
        messaging_product: "whatsapp",
        to: reciever,
        type: "interactive",
        interactive: {
          type: "list",
          header: {
            type: "text",
            text: "Delete Account Confirmation",
          },
          body: {
            text: "Are you sure you want to delete your account?",
          },
          action: {
            button: "Tap for the options",
            sections: [
              {
                title: "Confirm",
                rows: [
                  {
                    id: `delete_yes`,
                    title: `Yes`,
                  },
                  {
                    id: `delete_no`,
                    title: `No`,
                    description: `Your price trackers remain safe if you keep your account.`,
                  },
                ],
              },
            ],
          },
        },
      }),
    });

    await logSentMessages({
      sentText: "Delete confimation message",
      sentTo: reciever,
      type: "list",
    });
  } catch (error) {
    await ErrorLogger({
      error,
      type: ERROR_TYPE.MESSAGE_NOT_SENT,
      customErrorMessage: `Error in sending delete confirmation message to ${reciever}`,
      consoleLog: true,
    });
  }
};
