import { Request, Response } from "express";
import { findProducts } from "../db/products.database";

export async function handleGetProducts(req: Request, res: Response) {
  try {
    const products = await findProducts();

    return res.status(200).json(products);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleGetProduct(req: Request, res: Response) {
  const { id } = req.params;
}

export async function handleCreateProduct(req: Request, res: Response) {
  const {
    name,
    description,
    price,
    discountPrice,
    isNew,
    gender,
    categoryId,
    collectionId,
  } = req.body;

  //Recieve product object
  //Use files middleware to handle the images Errors
  //Upload image to aws and return the key and the url for each image
  //Save final product object with images in database
  //return the product object to add to the redux products store

  return res.send();
}

export async function handleDeleteProduct(req: Request, res: Response) {
  const { id } = req.params;
}

export async function handleUpdateProduct(req: Request, res: Response) {
  const { id } = req.params;
}
