import { Router } from "express";
import {
  handleAddSupportedWebsite,
  handleAdminAuthValidation,
  handleAdminExists,
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
router.get("/check-admin-exists", handleAdminExists);

// NEEDS AUTHENTICATION:

router.get(
  "/auth/validate",
  passport.authenticate("jwt", { session: false }),
  handleAdminAuthValidation
);

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
router.get(
  "/messages-sent",
  passport.authenticate("jwt", { session: false }),
  handleMessagesSent
);
router.get(
  "/messages-recieved",
  passport.authenticate("jwt", { session: false }),
  handleMessagesRecieved
);

router.get(
  "/more-trackers-req",
  passport.authenticate("jwt", { session: false }),
  handleMoreTrackerReq
);
router.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  handleAllProducts
);
router.get(
  "/customers",
  passport.authenticate("jwt", { session: false }),
  handleAllUsers
);
router.get(
  "/websites",
  passport.authenticate("jwt", { session: false }),
  handleAllWebsites
);
router.get(
  "/errors",
  passport.authenticate("jwt", { session: false }),
  handleAllErrors
);

export default router;
