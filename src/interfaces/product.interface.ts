export default interface IProduct {
  name: string;
  description: string;
  price: number;
  discountPrice: null | number;
  display: boolean; //Mostrar na store ou não. O usuário pode setar isso se nao quiser mostrar determinado produto na store
  isSoldOut: boolean;
  isNewProduct: boolean;
  gender: ["all", "men", "women"];
  thumb: string;
  categoryId: string;
  collectionId: string;
  createdAt: Date;
  updatedAt: Date;
}
