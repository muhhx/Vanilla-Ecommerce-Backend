import { Request, Response } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../db/category.database";
import { findProductsByCategory } from "../db/products.database";

export async function handleGetCategories(req: Request, res: Response) {
  try {
    const categories = await getCategories();

    return res.status(200).json(categories);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleCreateCategory(req: Request, res: Response) {
  const { name } = req.body;

  try {
    if (!name) {
      return res.sendStatus(400);
    }

    const response = await createCategory(name);

    return res.status(201).json({ _id: response._id, name: response.name });
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleUpdateCategory(req: Request, res: Response) {
  const { id } = req.params;
  const { newName } = req.body;

  try {
    if (!newName) {
      return res.sendStatus(400);
    }

    await updateCategory(id, newName);

    return res.status(200).json({ _id: id, name: newName });
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function handleDeleteCategory(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const products = await findProductsByCategory(id);

    if (products.length > 0) {
      return res
        .status(405)
        .json(
          "Existem produtos com essa categoria. Delete eles ou apenas atualize a categoria."
        );
    }

    const response = await deleteCategory(id);

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}
