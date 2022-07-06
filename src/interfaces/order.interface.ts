interface IOrderItem {
  productId: string;
  colorName: string;
  size: string;
  thumbImage: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  user_Id: string;
  items: IOrderItem[];
  total: number;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}
