interface IImage {
  url: string;
  key: string;
}

export interface IOption {
  color: string;
  name: string;
  sizes: string[];
  images: IImage[];
}

export default interface IProduct {
  name: string;
  description: string;
  price: number;
  hasDiscount: boolean;
  discountPrice: number;
  display: boolean;
  isSoldOut: boolean;
  isNewProduct: boolean;
  gender: ["all", "men", "women"];
  thumb: string;
  categoryId: string;
  collectionId: string;
  options: IOption[];
  createdAt: Date;
  updatedAt: Date;
}
