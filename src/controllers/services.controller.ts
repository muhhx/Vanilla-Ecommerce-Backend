import { Request, Response } from "express";
import { uploadImagesAws } from "../services/aws";
import { createSessionStripe } from "../services/stripe";
import { findProductsByCartId } from "../db/products.database";
import IItem from "../interfaces/item.interface";

export async function handleUploadImages(req: Request, res: Response) {
  const images = req.files as Express.Multer.File[];

  try {
    if (!images) {
      return res.sendStatus(400);
    }

    const uploadedImages = await uploadImagesAws(images);

    const response = uploadedImages.map((image) => {
      return {
        url: image.Location,
        key: image.Key,
      };
    });

    return res.status(201).json(response);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleCreateCheckout(req: Request, res: Response) {
  const { cart } = req.body as { cart: IItem[] };

  try {
    const cartIds = cart.map((cartItem) => {
      return cartItem.productId;
    });

    const products = await findProductsByCartId(cartIds);

    let final = [];
    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (cart[i].productId === String(products[j]._id)) {
          final.push({ cart: cart[i], product: products[j] });
        }
      }
    }

    const session = await createSessionStripe(final);
    return res.status(200).json(session);
  } catch (error) {
    return res.sendStatus(500);
  }
}
