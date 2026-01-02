import clsx from "clsx";
import { ShoppingCart, ShoppingBag } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar = ({ cartCount, onOpenCart }: NavbarProps) => (
  <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
    <div className="max-container-w mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <ShoppingBag size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight text-indigo-950">
          WMT Store
        </span>
      </div>
      <button
        onClick={onOpenCart}
        className={clsx(
          "relative group flex items-center gap-2",
          "p-2 text-slate-600 hover:text-indigo-600 transition-colors"
        )}
        aria-label="Open shopping cart"
        tabIndex={0}
      >
        <span className="hidden sm:inline text-sm font-semibold">Cart</span>
        <div className="relative">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span
              className={clsx(
                "absolute -top-2 -right-2 flex items-center justify-center h-5 w-5",
                "bg-rose-500 text-white text-[10px] font-bold rounded-full ring-2 ring-white",
                "animate-in zoom-in"
              )}
            >
              {cartCount}
            </span>
          )}
        </div>
      </button>
    </div>
  </nav>
);
