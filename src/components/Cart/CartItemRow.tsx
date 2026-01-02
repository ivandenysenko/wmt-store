import { Plus, Minus, X, CheckCircle2 } from "lucide-react";
import {
  QuantityAction,
  type CartItem,
  type RemoveFromCart,
  type UpdateQuantity,
} from "@/shared/types";
import { memo } from "react";
import { clsx } from "clsx";
import { formatMoney } from "@/shared/utils";
import { imageQuery } from "@/shared/settings";

interface CartItemRowProps {
  item: CartItem;
  onUpdate: UpdateQuantity;
  onRemove: RemoveFromCart;
}

export const CartItemRow = memo(
  ({ item, onUpdate, onRemove }: CartItemRowProps) => {
    return (
      <div className="flex gap-4 py-4 border-b border-slate-100 last:border-0">
        <div
          className={clsx(
            "h-20 w-20 rounded-lg bg-slate-100 flex-shrink-0 border border-slate-200"
          )}
        >
          <img
            src={`${item.image}?${imageQuery}&w=800`}
            srcSet={`
            ${item.image}?${imageQuery}&w=400 400w,
            ${item.image}?${imageQuery}&w=800 800w,
            ${item.image}?${imageQuery}&w=1600 1600w
          `}
            sizes="
            (max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            33vw
          "
            alt={item.title}
            className="w-full h-full rounded-[inherit] object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-slate-900 text-sm leading-tight pr-4">
              {item.title}
            </h4>
            <button
              onClick={() => onRemove(item.id)}
              className="text-slate-400 hover:text-rose-500 transition-colors"
              aria-label="Remove item from cart"
              tabIndex={0}
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-indigo-600 font-bold text-sm mb-2">
            ${formatMoney(item.price)}
          </p>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
              <button
                onClick={() => onUpdate(item.id, QuantityAction.DECREMENT)}
                className="p-1 hover:bg-white rounded transition-all"
                aria-label="Decrease quantity"
                tabIndex={0}
              >
                <Minus size={12} />
              </button>
              <span className="w-8 text-center font-bold text-xs">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdate(item.id, QuantityAction.INCREMENT)}
                className="p-1 hover:bg-white rounded transition-all"
                aria-label="Increase quantity"
                tabIndex={0}
              >
                <Plus size={12} />
              </button>
            </div>
            {item.quantity > 5 && (
              <div
                className={clsx(
                  "flex items-center gap-1 px-2 py-1 rounded",
                  "text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100"
                )}
              >
                <CheckCircle2 size={10} /> 10% BULK DISCOUNT
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
