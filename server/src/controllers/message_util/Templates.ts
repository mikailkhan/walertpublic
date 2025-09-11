import axios from "axios";
import { Response, Request } from "express";
import { WHATSAPP_API_KEY, WHATSAPP_URL } from "../../configs/config";
import { getAllSupportedWebsites } from "../../models/adminModel";
import { ProductType } from "../../db/types";

export const sendTemplateMessage = async (req: Request, res: Response) => {
  // data
  const reciever = "923362601002";
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
};

export const sendTextMessage = async ({
  reciever,
  messageText,
}: {
  reciever: string;
  messageText: string;
}) => {
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
};

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
          text: "Walert.pk",
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
              ],
            },
            {
              title: "Second Section",
              rows: [
                {
                  id: "update_profile_name",
                  title: "3. Update Profile Name",
                  description: "Do you want to change what we call you?",
                },
                {
                  id: "get_more_trackers",
                  title: "4. Get More Trackers 🔥",
                  description:
                    "Do you want to increase your profile tracker limit?",
                },
                {
                  id: "delete_profile",
                  title: "5. Delete Profile",
                  description: "Do you want to unsubscribe from our services?",
                },
              ],
            },
          ],
        },
      },
    }),
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
};

export const sendLimitHitMessage = ({
  reciever,
}: {
  reciever: string;
}): void => {
  sendTextMessage({
    reciever,
    messageText: `🚦 Oops! You've reached your tracker limit. To start tracking your new product, please remove one of your existing trackers first in menu.`,
  });
};

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

const sendTrackerDeletedMessage = ({
  reciever,
}: {
  reciever: string;
}): void => {
  sendTextMessage({
    reciever,
    messageText: `🗑️ Your tracker has been deleted successfully! Want to add another one? Just send us the URL 🔗`,
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
