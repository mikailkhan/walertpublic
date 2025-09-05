import axios from "axios";
import { Response, Request } from "express";
import {
  WHATSAPP_API_KEY,
  WHATSAPP_URL,
  WHATSAPP_VERIFY_TOKEN,
} from "../configs/config";
import { createNewUser, isNewUser } from "../models/userModel";

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

  const messages = changes[0].value.messages
    ? changes[0].value.messages[0]
    : null;
  const name = changes[0].value.contacts
    ? changes[0].value.contacts[0].profile.name
    : null;
  const chatbotNumber = changes[0].value.metadata.display_phone_number
    ? changes[0].value.metadata.display_phone_number
    : null;

  if (messages && messages.type === "text") {
    const userNumber = messages.from;
    const message_id = messages.id;
    const text: string = messages.text.body;
    const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);

    if (await isNewUser({ number: userNumber })) {
      await createNewUser({ fullName: name, number: userNumber });
      sendReplyMessage({
        reciever: userNumber,
        messageText: `Hello ${name}, Welcome to Walert.pk`,
        messageId: message_id,
      });
    }

    if (isMenuRequest(text)) {
      await sendTextMessage({
        reciever: userNumber,
        messageText: `LIST OF COMMANDS`,
      });
    } else {
      if (isURL(text)) {
        await sendReplyMessage({
          reciever: userNumber,
          messageText: `URL is valid`,
          messageId: message_id,
        });
      } else {
        // If invalid url
        await sendReplyMessage({
          reciever: userNumber,
          messageText: `❌ Invalid URL, please send a correct URL, for example, _(https://www.example.com/product/macbookpro)_`,
          messageId: message_id,
        });
      }
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
