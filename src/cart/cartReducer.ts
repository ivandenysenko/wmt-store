import type { CartItem, Product } from "@/shared/types";

export enum CartActionType {
  Add,
  Remove,
  UpdateQuantity,
}

export type CartAction =
  | { type: CartActionType.Add; product: Product }
  | { type: CartActionType.Remove; id: number }
  | { type: CartActionType.UpdateQuantity; id: number; delta: 1 | -1 };

export function cartReducer(prev: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case CartActionType.Add: {
      const idx = prev.findIndex((i) => i.id === action.product.id);
      if (idx === -1) return [...prev, { ...action.product, quantity: 1 }];

      const next = [...prev];
      next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
      return next;
    }

    case CartActionType.Remove:
      return prev.filter((i) => i.id !== action.id);

    case CartActionType.UpdateQuantity:
      return prev.reduce<CartItem[]>((acc, item) => {
        if (item.id !== action.id) return acc.push(item), acc;
        const quantity = item.quantity + action.delta;

        if (quantity > 0) acc.push({ ...item, quantity });
        return acc;
      }, []);

    default:
      return [...prev];
  }
}
