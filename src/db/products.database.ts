import ProductModel from "../models/product.model";

export const createProduct = (
  name: string,
  description: string,
  price: number,
  thumb: string,
  gender: string,
  categoryId: string,
  collectionId: string
) => {
  return ProductModel.create({
    name,
    description,
    price,
    thumb,
    gender: ["all", gender],
    categoryId,
    collectionId,
  });
};

export const findProducts = () => {
  return ProductModel.find();
};
