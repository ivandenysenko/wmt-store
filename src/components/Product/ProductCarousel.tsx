import { memo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type {
  AddToCart,
  CartItem,
  Product,
  UpdateQuantity,
} from "@/shared/types";
import { ProductCard } from "./ProductCard";
import clsx from "clsx";

enum Direction {
  Left,
  Right,
}

interface ProductCarouselProps {
  products: Product[];
  cart: CartItem[];
  onAdd: AddToCart;
  onUpdate: UpdateQuantity;
}

const buttonSharedStyles = [
  "absolute top-1/2 -translate-y-1/2 z-20 mx-4",
  "bg-white border border-slate-200 p-3 rounded-full shadow-lg text-slate-600",
  "opacity-0 hover:bg-slate-50 transition-all",
  "group-hover:opacity-100 group-hover:translate-x-0",
  "focus-visible:opacity-100 focus-visible:translate-x-0",
];

export const ProductCarousel = memo(
  ({ products, cart, onAdd, onUpdate }: ProductCarouselProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: Direction) => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const scrollTo =
          direction === Direction.Left
            ? scrollLeft - clientWidth
            : scrollLeft + clientWidth;
        scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
      }
    };

    return (
      <main className="max-container-w mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Our Products
            </h2>
            <p className="text-slate-500 mt-1">
              Scroll to explore the collection
            </p>
          </div>
          <div className="h-px flex-1 bg-slate-100 mx-8 hidden md:block"></div>
        </div>
        <div className="relative group">
          <button
            onClick={() => scroll(Direction.Left)}
            className={clsx("left-0 -translate-x-4", buttonSharedStyles)}
            aria-label="Scroll Left"
            tabIndex={0}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll(Direction.Right)}
            className={clsx("right-0 translate-x-4", buttonSharedStyles)}
            aria-label="Scroll Right"
            tabIndex={0}
          >
            <ChevronRight size={24} />
          </button>

          <div
            ref={scrollRef}
            className={clsx(
              "flex gap-6 pb-8 overflow-x-auto",
              "snap-x snap-mandatory scrollbar-hide no-scrollbar scroll-smooth"
            )}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, i) => {
              const cartItem = cart.find((item) => item.id === product.id);
              const quantity = cartItem ? cartItem.quantity : 0;
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  prioritize={i === 0}
                  onAdd={onAdd}
                  onUpdate={onUpdate}
                />
              );
            })}
          </div>
        </div>
      </main>
    );
  }
);
