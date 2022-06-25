interface IProductOption {
  rgb: string;
  name: string;
  sizes: string[];
  images: string[];
}

export default interface IProduct {
  name: string;
  description: string;
  price: number;
  discountPrice: null | number;
  isAvailable: boolean;
  isNew: boolean;
  gender: ["all", "men", "women"];
  options: IProductOption[];
  thumb: string;
  categoryId: string;
  collectionId: string;
  createdAt: Date;
  updatedAt: Date;
}
