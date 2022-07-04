import ProductModel from "../models/product.model";
import { IOption } from "../interfaces/product.interface";

export const createProduct = (
  name: string,
  description: string,
  price: number,
  gender: string,
  categoryId: string,
  collectionId: string,
  options: IOption[]
) => {
  return ProductModel.create({
    name,
    description,
    price,
    thumb: options[0].images[0].url,
    gender: ["all", gender],
    categoryId,
    collectionId,
    options,
  });
};

export const findProducts = () => {
  return ProductModel.find();
};

export const findProduct = (_id: string) => {
  return ProductModel.findById(_id);
};

export const deleteProduct = (productId: string) => {
  return ProductModel.findByIdAndDelete(productId);
};

export const updateProduct = (
  productId: string,
  payload: {
    name?: string;
    description?: string;
    display?: boolean;
    isSoldOut?: boolean;
    isNewProduct?: boolean;
    price?: number;
    discountPrice?: number;
    hasDiscount?: boolean;
    gender?: string[];
    categoryId?: string;
    collectionId?: string;
    thumb?: string;
  }
) => {
  return ProductModel.findByIdAndUpdate(productId, payload);
};
