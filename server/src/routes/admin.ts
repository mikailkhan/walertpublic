import { Router } from "express";
import { handleAddSupportedWebsite } from "../controllers/adminController";

const router = Router();

router.post("/add-supported-website", handleAddSupportedWebsite);

export default router;
