import axios from "axios";
import { Response, Request } from "express";
import { WHATSAPP_API_KEY, WHATSAPP_URL } from "../configs/config";

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
