import ProductModel from "../models/product.model";

export const findProducts = () => {
  return ProductModel.find();
};
