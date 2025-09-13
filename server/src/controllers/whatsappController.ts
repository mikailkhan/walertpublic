import { Response, Request } from "express";
import { WHATSAPP_VERIFY_TOKEN } from "../configs/config";
import { Message } from "../types/Message";
import { handleListReply } from "./message_util/HandleLists";
import { handleTextMessage } from "./message_util/HandleText";

/**
 * This function varifies if we got the hook verified before starting recieving messages.
 *
 *
 * @param req - Request by express
 * @param res - Response by express
 */
export const getVerification = (req: Request, res: Response) => {
  const {
    "hub.mode": mode,
    "hub.challenge": challenge,
    "hub.verify_token": token,
  } = req.query;

  if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN) {
    console.log("✅ WEBHOOK VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
};

/**
 * This function recieves the message from the meta cloud api
 * It check if the message is a text (url, or other command) or interactive (menu)
 *
 * @param req
 * @param res
 * @returns Response
 */

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

  // const chatbotNumber: string = changes[0].value.metadata.display_phone_number
  //   ? changes[0].value.metadata.display_phone_number
  //   : null;

  if (messages) {
    if (messages.type === "text") {
      handleTextMessage(messages, name);
    } else if (messages.type === "interactive") {
      handleListReply({ messages });
    }

    return res.status(200).end();
  }
};
