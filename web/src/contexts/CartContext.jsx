import { createContext, useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { AnimatePresence } from "framer-motion";

import Cart from "@features/Cart";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useLocalStorage("cart", []);

  const addCartItem = (product, quantity) => {
    let updatedCart;
    if (cart.find((item) => item.product._id === product._id)) {
      updatedCart = cart.map((item) =>
        item.product._id === product._id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
    } else {
      updatedCart = [...cart, { product, quantity }];
    }
    setCart(updatedCart);
  };

  const increaseCartItem = (product) => {
    let updatedCart = cart.map((item) =>
      item.product._id === product._id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
    setCart(updatedCart);
  };

  const decreaseCartItem = (product) => {
    let updatedCart = cart.map((item) =>
      item.product._id === product._id
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item
    );
    setCart(updatedCart);
  };

  const removeCartItem = (product) => {
    let updatedCart = cart.filter((item) => item.product._id !== product._id);
    setCart(updatedCart);
  };

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const paymentAmount = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    [cart]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const cartStore = {
    data: { cart, paymentAmount },
    action: {
      addCartItem,
      removeCartItem,
      increaseCartItem,
      decreaseCartItem,
      toggleCart,
    },
  };

  return (
    <CartContext.Provider value={cartStore}>
      {children}
      <AnimatePresence>{isOpen && <Cart />}</AnimatePresence>
    </CartContext.Provider>
  );
};

export default CartProvider;
