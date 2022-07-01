import { Request, Response } from "express";
import { findProducts, createProduct } from "../db/products.database";

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
  const { name, description, price, gender, categoryId, collectionId, thumb } =
    req.body;

  if (
    !name ||
    !description ||
    !price ||
    !gender ||
    !thumb ||
    !categoryId ||
    !collectionId
  ) {
    return res
      .status(400)
      .json({ message: "Por favor, preencha todos os campos." });
  }

  try {
    const product = await createProduct(
      name,
      description,
      Number(price),
      thumb,
      gender,
      categoryId,
      collectionId
    );

    return res.status(201).json(product._id);
  } catch (error) {
    return res.sendStatus(500);
  }

  //Recieve product object
  //Use files middleware to handle the images Errors
  //Upload image to aws and return the key and the url for each image
  //Save final product object with images in database
  //return the product object to add to the redux products store

  /**
   *  discountPrice will be null by defaultm but can be added after when editing the product
   *  isAvailable, same. Default: true
   *  isNewProduct, same. Default: true
   *  thumb, same. Default: null
   *  gender: "all" + genderInput
   */
}

export async function handleDeleteProduct(req: Request, res: Response) {
  const { id } = req.params;
}

export async function handleUpdateProduct(req: Request, res: Response) {
  const { id } = req.params;
}
