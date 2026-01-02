export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum QuantityAction {
  INCREMENT,
  DECREMENT,
}

export interface CartTotals {
  subtotal: number;
  totalDiscount: number;
  total: number;
  count: number;
}

export type UpdateQuantity = (id: number, action: QuantityAction) => void;
export type AddToCart = (product: Product) => void;
export type RemoveFromCart = (id: number) => void;
