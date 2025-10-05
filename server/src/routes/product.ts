import { Router } from "express";
import { handleFetchProduct } from "../controllers/ProductController";

const productRouter = Router();

// Product Info
productRouter.get("/:id", handleFetchProduct);

export default productRouter;
