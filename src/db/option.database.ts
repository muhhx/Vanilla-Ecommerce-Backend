import OptionModel from "../models/option.model";

export const createOption = (
  productId: string,
  color: string,
  name: string,
  sizes: string[],
  images: { url: string; key: string }[]
) => {
  return OptionModel.create({
    productId,
    color,
    sizes,
    images,
    name,
  });
};
