import type {
  CartItem,
  CartTotals,
  RemoveFromCart,
  UpdateQuantity,
} from "@/shared/types";
import { Info, ShoppingBag, ShoppingCart, X } from "lucide-react";
import { CartItemRow } from "./CartItemRow";
import clsx from "clsx";
import { formatMoney } from "@/shared/utils";
import { useEffect } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  totals: CartTotals;
  onClose: () => void;
  onUpdateQuantity: UpdateQuantity;
  onRemoveItem: RemoveFromCart;
}

export const CartDrawer = ({
  isOpen,
  cart,
  totals,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) => {
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div
      className={clsx("fixed inset-0 z-50", isOpen ? "visible" : "invisible")}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div
        className={clsx(
          "absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      <aside
        className={clsx(
          "absolute right-0 top-0 h-full w-full max-w-md",
          "bg-white shadow-2xl transition-transform duration-500 ease-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <header className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded text-white">
                <ShoppingCart size={18} />
              </div>

              <h2 className="text-xl font-bold flex items-center gap-3">
                Shopping Cart
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 rounded-full text-slate-500"
              aria-label="Close cart"
              tabIndex={0}
            >
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                <div className="mb-4 bg-slate-50 p-8 rounded-full">
                  <ShoppingBag size={64} className="opacity-10" />
                </div>
                <p className="text-xl font-semibold text-slate-900">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdate={onUpdateQuantity}
                    onRemove={onRemoveItem}
                  />
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <footer className="p-6 bg-slate-50 border-t border-slate-200">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>Subtotal</span>
                  <span className="font-mono">
                    ${formatMoney(totals.subtotal)}
                  </span>
                </div>

                {totals.totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold text-sm">
                    <span className="flex items-center gap-1 italic">
                      Bulk Discount (10% off) <Info size={14} />
                    </span>
                    <span className="font-mono">
                      -${formatMoney(totals.totalDiscount)}
                    </span>
                  </div>
                )}

                <div
                  className={clsx(
                    "flex justify-between",
                    "text-2xl font-bold pt-4 border-t border-slate-200 text-slate-900"
                  )}
                >
                  <span>Total</span>
                  <span className="font-mono">
                    ${formatMoney(totals.total)}
                  </span>
                </div>
              </div>

              <button
                className={clsx(
                  "flex items-center justify-center gap-3",
                  "w-full bg-slate-900 text-white p-4 rounded-xl font-bold",
                  "transition-all duration-200 ease-in-out hover:bg-indigo-600 hover:shadow-lg active:scale-[0.98]"
                )}
                type="button"
                aria-label="Confirm Checkout"
                tabIndex={0}
              >
                Confirm Checkout
              </button>
            </footer>
          )}
        </div>
      </aside>
    </div>
  );
};
