import { createContext, useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { AnimatePresence } from "framer-motion";

import { useSnackbar } from "notistack";

import Cart from "@features/Cart";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useLocalStorage("cart", []);

  const isExceedLimit = (product, desiredQuantity) => {
    let cartItem = cart.find((item) => item.product._id === product._id);
    return cartItem.quantity + desiredQuantity > product.quantity;
  };

  const addCartItem = (product, desiredQuantity) => {
    let updatedCart;
    if (cart.find((item) => item.product._id === product._id)) {
      if (isExceedLimit(product, desiredQuantity)) {
        enqueueSnackbar(
          "Quantity cannot be increased. because you already have some of this product in your cart.",
          {
            variant: "error",
          }
        );
        return;
      }
      updatedCart = cart.map((item) =>
        item.product._id === product._id
          ? {
              ...item,
              quantity: item.quantity + desiredQuantity,
            }
          : item
      );
    } else {
      updatedCart = [...cart, { product, quantity: desiredQuantity }];
    }
    setCart(updatedCart);
    enqueueSnackbar("Successfully added to your cart.", {
      variant: "success",
    });
  };

  const increaseCartItem = (product) => {
    if (isExceedLimit(product, 1)) {
      enqueueSnackbar(
        "Quantity cannot be increased. because you already have some of this product in your cart.",
        {
          variant: "error",
        }
      );
      return;
    }
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
