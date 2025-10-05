import { Request, Response } from "express";
import { getProduct } from "../models/ProductModel";

export const handleFetchProduct = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);

    const product = await getProduct(id);

    return res.json(product);
  } catch (error) {
    return res.json({ message: "Something went wrong" });
  }
};
