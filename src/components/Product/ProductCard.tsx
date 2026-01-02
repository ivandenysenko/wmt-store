import { Plus, Minus } from "lucide-react";
import {
  QuantityAction,
  type AddToCart,
  type Product,
  type UpdateQuantity,
} from "@/shared/types";
import { memo } from "react";
import { formatMoney } from "@/shared/utils";
import clsx from "clsx";
import { imageQuery } from "@/shared/settings";

interface ProductCardProps {
  product: Product;
  quantity: number;
  prioritize: boolean;
  onAdd: AddToCart;
  onUpdate: UpdateQuantity;
}

export const ProductCard = memo(
  ({ product, quantity, prioritize, onAdd, onUpdate }: ProductCardProps) => (
    <div
      className={clsx(
        "snap-start flex-shrink-0 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(100%/3-1rem)]",
        "border border-slate-200 transition-[width,box-shadow] hover:shadow-lg"
      )}
    >
      <div className="relative aspect-[4/3]">
        <img
          src={`${product.image}?${imageQuery}&w=800`}
          srcSet={`
            ${product.image}?${imageQuery}&w=400 400w,
            ${product.image}?${imageQuery}&w=800 800w,
            ${product.image}?${imageQuery}&w=1600 1600w
          `}
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            33vw
          "
          alt={product.title}
          className="h-full w-full object-cover"
          fetchPriority={prioritize ? "high" : undefined}
          loading={prioritize ? "eager" : "lazy"}
          decoding="async"
        />
        <span
          className={clsx(
            "absolute right-4 top-4 rounded-full",
            "bg-white px-3 py-1 text-sm font-semibold"
          )}
        >
          ${formatMoney(product.price)}
        </span>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="min-h-[3.25rem]">
          <h3 className="font-semibold text-slate-900">{product.title}</h3>
          <p className="text-sm text-slate-500">{product.description}</p>
        </div>

        {quantity > 0 ? (
          <div
            className={clsx(
              "flex items-center justify-between",
              "rounded-xl border border-slate-200 bg-slate-100 p-1"
            )}
          >
            <button
              onClick={() => onUpdate(product.id, QuantityAction.DECREMENT)}
              className="rounded-lg p-2 hover:bg-white"
              aria-label="Decrease quantity"
              tabIndex={0}
            >
              <Minus size={22} />
            </button>

            <span className="font-semibold">{quantity}</span>

            <button
              onClick={() => onUpdate(product.id, QuantityAction.INCREMENT)}
              className="rounded-lg p-2 hover:bg-white"
              aria-label="Increase quantity"
              tabIndex={0}
            >
              <Plus size={22} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(product)}
            className={clsx(
              "flex items-center justify-center gap-2",
              "rounded-xl bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800"
            )}
            tabIndex={0}
          >
            <Plus size={18} /> Add to Cart
          </button>
        )}
      </div>
    </div>
  )
);
