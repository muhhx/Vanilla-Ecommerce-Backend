interface IImage {
  url: string;
  key: string;
}

export default interface IOption {
  productId: string;
  color: string;
  name: string;
  sizes: string[];
  images: IImage[];
  createdAt: Date;
  updatedAt: Date;
}
