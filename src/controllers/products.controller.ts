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
}

export async function handleDeleteProduct(req: Request, res: Response) {
  const { id } = req.params;
}

export async function handleUpdateProduct(req: Request, res: Response) {
  const { id } = req.params;
}
