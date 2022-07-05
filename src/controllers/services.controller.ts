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
    //create an array with every cart productId items (so i can fetch fom db)
    const cartIds = cart.map((cartItem) => {
      return cartItem.productId;
    });

    //Find all products within cartId
    const products = await findProductsByCartId(cartIds);

    //Para cada item no carrinho, iterar os produtos, e se o produto for o mesmo, retornar um objeto com os 2
    let final = [];
    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (cart[i].productId === String(products[j]._id)) {
          final.push({ cart: cart[i], product: products[j] });
        }
      }
    }

    const session = await createSessionStripe(final);
    return res.send(session);
  } catch (error) {
    return res.sendStatus(500);
  }
}
