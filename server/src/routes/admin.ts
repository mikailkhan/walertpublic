import { Router } from "express";
import {
  handleAddSupportedWebsite,
  handleAllErrors,
  handleAllProducts,
  handleAllWebsites,
  handleDashboard,
  handleMessagesRecieved,
  handleMessagesSent,
  handleMoreTrackerReq,
} from "../controllers/adminController";

const router = Router();

router.post("/add-supported-website", handleAddSupportedWebsite);

router.get("/dashboard", handleDashboard);
router.get("/messages-sent", handleMessagesSent);
router.get("/messages-recieved", handleMessagesRecieved);
router.get("/more-trackers-req", handleMoreTrackerReq);
router.get("/products", handleAllProducts);
router.get("/customers", handleAllProducts);
router.get("/websites", handleAllWebsites);
router.get("/errors", handleAllErrors);

export default router;
