interface IImage {
  key: string;
  url: string;
}

export default interface IOption {
  productId: string;
  rgb: string;
  name: string;
  sizes: string[];
  images: IImage[];
  createdAt: Date;
  updatedAt: Date;
}
