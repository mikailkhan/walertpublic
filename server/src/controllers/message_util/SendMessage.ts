import axios from "axios";
import { WHATSAPP_API_KEY, WHATSAPP_URL } from "../../configs/config";
import { logSentMessages } from "../../models/MessagesModel";
import { logError } from "../../models/ErrorModel";
import { ERROR_TYPE } from "../../configs/errorConfig";
import { ProductType } from "../../db/types";

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
  try {
    // data
    // const reciever = "923362601112";
    const templateName = "drop_alert";
    const languageCode = "en";
    const username = "John";
    const productTitle = "Navy Basic Short MN-SHT-SS23-003 A";
    const productID = "123";

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
    errorHandling(error, reciever);
  }
};

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
    errorHandling(error, reciever);
  }
};

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
    errorHandling(error, reciever);
  }
};

// ###############################
// Specific cases Send messages.
// ###############################

export const sendMenuMessage = async ({ reciever }: { reciever: string }) => {
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
                  description: "Do you want to unsubscribe from our services?",
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
};

export const sendTrackerListForDeletion = async ({
  reciever,
  trackers,
}: {
  reciever: string;
  trackers: ProductType[];
}) => {
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
};

// ###############################
// Utility Section
// ###############################

const errorHandling = async (error: unknown, reciever: string) => {
  const err =
    error instanceof Error
      ? error.message
      : `Error in sending message to ${reciever}`;
  console.error(err);

  await logError({
    type: ERROR_TYPE.MESSAGE_NOT_SENT,
    errorMessage: err,
  });
};
