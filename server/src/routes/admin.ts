import { Router } from "express";
import {
  handleAddSupportedWebsite,
  handleAdminLogin,
  handleAdminRegistration,
  handleAllErrors,
  handleAllProducts,
  handleAllUsers,
  handleAllWebsites,
  handleDashboard,
  handleMessagesRecieved,
  handleMessagesSent,
  handleMoreTrackerReq,
} from "../controllers/adminController";
import passport from "passport";

const router = Router();

router.post("/register", handleAdminRegistration);
router.post("/login", handleAdminLogin);

router.post(
  "/add-supported-website",
  passport.authenticate("jwt", { session: false }),
  handleAddSupportedWebsite
);

router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  handleDashboard
);
router.get("/messages-sent", handleMessagesSent);
router.get("/messages-recieved", handleMessagesRecieved);
router.get("/more-trackers-req", handleMoreTrackerReq);
router.get("/products", handleAllProducts);
router.get("/customers", handleAllUsers);
router.get("/websites", handleAllWebsites);
router.get("/errors", handleAllErrors);

export default router;
