import { Request, Response } from "express";
import { getProduct } from "../models/ProductModel";

/**
 * Fetches product details for a given product ID included in a URL sent to the user via a template message.
 *
 * This endpoint retrieves product information from the database using the product ID
 * provided in the request parameters, and returns essential product details.
 *
 * @async
 * @param {Request} req - The HTTP request object containing the product ID in `req.params`.
 * @param {Response} res - The HTTP response object used to send the JSON response.
 * @returns A JSON response containing product details, including:
 * - `productTitle` — The title of the product.
 * - `url` — The product’s link.
 * - `oldPrice` — The original price of the product.
 * - `website` — The source website of the product.
 */
export const handleFetchProduct = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);

    const product = await getProduct(id);

    return res.json(product);
  } catch (error) {
    return res.json({ message: "Something went wrong" });
  }
};
