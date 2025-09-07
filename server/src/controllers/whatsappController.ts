import axios from "axios";
import { Response, Request } from "express";
import {
  WHATSAPP_API_KEY,
  WHATSAPP_URL,
  WHATSAPP_VERIFY_TOKEN,
} from "../configs/config";
import { createNewUser, isNewUser } from "../models/userModel";
import { Message } from "../types/Message";

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
                  title: "4. Get More Trackers",
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

const sendLimitHitMessage = ({ reciever }: { reciever: string }): void => {
  sendTextMessage({
    reciever,
    messageText: `🚦 Oops! You've reached your tracker limit. To start tracking your new product, please remove one of your existing trackers first.`,
  });
};

const sendTrackerInitialisedMessage = ({
  reciever,
}: {
  reciever: string;
}): void => {
  sendTextMessage({
    reciever,
    messageText: `Your tracker has been initialized and is ready to go! 🚀`,
  });
};

const sendAccountSuccessfulDeletedMessage = ({
  reciever,
}: {
  reciever: string;
}): void => {
  sendTextMessage({
    reciever,
    messageText: `✅ Your account has been deleted. Thanks for being with us — we'd love to see you again in the future! 💙`,
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

// Util Functions
const isURL = (url: string): boolean => {
  try {
    new URL(url);
  } catch (err) {
    return false;
  }

  return true;
};

const isMenuRequest = (text: string): boolean => {
  return text.toLowerCase() === "menu" ? true : false;
};

const handleTextMessage = async (
  messages: Message,
  name: string
): Promise<void> => {
  const text: string = messages.text ? messages.text.body : "";

  if (await isNewUser({ number: messages.from })) {
    await createNewUser({ fullName: name, number: messages.from });
    await sendReplyMessage({
      reciever: messages.from,
      messageText: `👋 Hello ${name}, welcome to Walert.pk! 🎉 We're excited to have you here.`,
      messageId: messages.id,
    });

    if (isURL(text)) {
      await sendReplyMessage({
        reciever: messages.from,
        messageText: `URL is valid`,
        messageId: messages.id,
      });
    }

    return;
  }

  if (isMenuRequest(text)) {
    try {
      await sendMenuMessage({ reciever: messages.from });
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
    }
  } else {
    if (isURL(text)) {
      await sendReplyMessage({
        reciever: messages.from,
        messageText: `URL is valid`,
        messageId: messages.id,
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

const handleMenuListReply = async ({
  messages,
}: {
  messages: Message;
}): Promise<void> => {
  if (messages.interactive) {
    if (messages.interactive.type === "list_reply") {
      const listReplyId = messages.interactive.list_reply.id;
      const listReplyTitle = messages.interactive.list_reply.title;

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

// WEBHOOKS

export const getVerification = (req: Request, res: Response) => {
  const {
    "hub.mode": mode,
    "hub.challenge": challenge,
    "hub.verify_token": token,
  } = req.query;

  if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
};

export const recieveMessage = async (req: Request, res: Response) => {
  const { entry } = req.body;

  if (!entry || entry.length === 0) {
    return res.status(400);
  }

  const changes = entry[0].changes;

  if (!changes || changes.length === 0) {
    return res.status(400);
  }

  const messages: Message = changes[0].value.messages
    ? changes[0].value.messages[0]
    : null;
  const name: string = changes[0].value.contacts
    ? changes[0].value.contacts[0].profile.name
    : null;
  const chatbotNumber: string = changes[0].value.metadata.display_phone_number
    ? changes[0].value.metadata.display_phone_number
    : null;

  if (messages) {
    const userNumber = messages.from;
    const message_id = messages.id;

    if (messages.type === "text") {
      handleTextMessage(messages, name);
    } else if (messages.type === "interactive") {
      handleMenuListReply({ messages });
    }

    // console.log(`name: ${name}`);
    // console.log(`from: ${userNumber}`);
    // console.log(`message_id: ${message_id}`);
    // console.log(`text: ${text}`);
    // console.log(`to: ${chatbotNumber}`);
    // console.log(`\n\nWebhook received ${timestamp}\n`);
    return res.status(200).end();
  }

  // console.log(JSON.stringify(req.body, null, 2));
};
