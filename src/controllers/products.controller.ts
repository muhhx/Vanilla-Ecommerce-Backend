import { Request, Response } from "express";
import {
  findProducts,
  findProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../db/products.database";
import { IOption } from "../interfaces/product.interface";

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

  try {
    const product = await findProduct(id);

    if (!product) {
      return res.sendStatus(404);
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleCreateProduct(req: Request, res: Response) {
  const {
    name,
    description,
    price,
    gender,
    categoryId,
    collectionId,
    options,
  } = req.body as {
    name: string;
    description: string;
    price: string;
    gender: string;
    categoryId: string;
    collectionId: string;
    options: IOption[];
  };

  if (
    !name ||
    !description ||
    !price ||
    !gender ||
    !categoryId ||
    !collectionId
  ) {
    return res
      .status(400)
      .json({ message: "Por favor, preencha todos os campos." });
  }

  if (options.length === 0) {
    return res
      .status(400)
      .json({ message: "Crie no mínimo uma opção para o produto." });
  }

  try {
    const product = await createProduct(
      name,
      description,
      Number(price),
      gender,
      categoryId,
      collectionId,
      options
    );

    return res.status(201).json(product);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleDeleteProduct(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await deleteProduct(id);

    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleUpdateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const {
    name,
    description,
    display,
    isSoldOut,
    isNewProduct,
    price,
    discountPrice,
    hasDiscount,
    gender,
    categoryId,
    collectionId,
    thumb,
  } = req.body;

  try {
    await updateProduct(id, {
      name,
      description,
      display,
      isSoldOut,
      isNewProduct,
      price,
      discountPrice,
      hasDiscount,
      gender: !gender ? undefined : ["all", gender],
      categoryId,
      collectionId,
      thumb,
    });

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}
