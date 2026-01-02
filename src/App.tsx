import { useState, useMemo, useEffect, useCallback } from "react";
import {
  QuantityAction,
  type AddToCart,
  type CartItem,
  type CartTotals,
  type RemoveFromCart,
  type UpdateQuantity,
} from "./shared/types";
import { PRODUCTS } from "./data/products";
import { DISCOUNT_FACTOR, QUANTITY_FOR_DISCOUNT } from "./shared/settings";
import { Navbar } from "./components/Layout/Navbar";
import { Hero } from "./components/Layout/Hero";
import { ProductCarousel } from "./components/Product/ProductCarousel";
import { Notification } from "./components/Notification/Notification";
import { CartDrawer } from "./components/Cart/CartDrawer";
import { Footer } from "./components/Layout/Footer";
import { CartActionType, cartReducer } from "./cart/cartReducer";

const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const cartTotals = useMemo<CartTotals>(() => {
    const totals = cart.reduce(
      (acc, item) => {
        const itemTotal = item.price * item.quantity;

        acc.subtotal += itemTotal;
        acc.count += item.quantity;

        if (item.quantity > QUANTITY_FOR_DISCOUNT) {
          acc.totalDiscount += itemTotal * DISCOUNT_FACTOR;
        }

        return acc;
      },
      {
        subtotal: 0,
        totalDiscount: 0,
        total: 0,
        count: 0,
      }
    );
    totals.total = totals.subtotal - totals.totalDiscount;

    return totals;
  }, [cart]);

  const addToCart: AddToCart = useCallback((product) => {
    setCart((prev) => cartReducer(prev, { type: CartActionType.Add, product }));
    setNotification(`Added ${product.title}`);
  }, []);

  const removeFromCart: RemoveFromCart = useCallback((id) => {
    setCart((prev) => cartReducer(prev, { type: CartActionType.Remove, id }));
  }, []);

  const updateQuantity: UpdateQuantity = useCallback((id, action) => {
    const delta: 1 | -1 = action === QuantityAction.INCREMENT ? 1 : -1;
    setCart((prev) =>
      cartReducer(prev, { type: CartActionType.UpdateQuantity, id, delta })
    );
  }, []);

  return (
    <>
      <div
        className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100"
        inert={isCartOpen}
      >
        <Navbar
          cartCount={cartTotals.count}
          onOpenCart={() => setIsCartOpen(true)}
        />
        <Hero />

        <ProductCarousel
          products={PRODUCTS}
          cart={cart}
          onAdd={addToCart}
          onUpdate={updateQuantity}
        />

        <Footer />
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        totals={cartTotals}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      <Notification message={notification} />
    </>
  );
};

export default App;
