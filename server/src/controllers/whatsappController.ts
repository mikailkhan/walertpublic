import axios from "axios";
import { Response, Request } from "express";
import {
  WHATSAPP_API_KEY,
  WHATSAPP_URL,
  WHATSAPP_VERIFY_TOKEN,
} from "../configs/config";

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

export const sendTextMessage = async (req: Request, res: Response) => {
  const reciever = "923362601002";
  const messageText = "This is a text message";
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

export const recieveMessage = (req: Request, res: Response) => {
  const data = req.body.entry[0].changes[0].value;

  const name = data.contacts[0].profile.name;
  const from = data.messages[0].from;
  const message_id = data.messages[0].id;
  const text = data.messages[0].text.body;
  const to = data.metadata.display_phone_number;
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);

  console.log(`name: ${name}`);
  console.log(`from: ${from}`);
  console.log(`message_id: ${message_id}`);
  console.log(`text: ${text}`);
  console.log(`to: ${to}`);
  console.log(`\n\nWebhook received ${timestamp}\n`);

  // console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
};
