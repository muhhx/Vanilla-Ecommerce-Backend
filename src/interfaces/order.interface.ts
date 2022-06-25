interface IOrderItem {
  productId: string;
  gender: "all" | "men" | "women";
  color: string;
  size: string;
  quantity: number;
}

export interface IOrder {
  user_Id: string;
  items: IOrderItem[];
  user_payment_Id: string;
  user_address_Id: string;
  total: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: Date;
  updatedAt: Date;
}
