import { useContext } from "react";

import { CartContext } from "@contexts/CartContext";
import { UserContext } from "@contexts/UserContext";

import ButtonBase from "@components/core/ButtonBase";

const useCart = () => {
  const {
    data: { cart, paymentAmount },
    action: {
      addCartItem,
      removeCartItem,
      increaseCartItem,
      decreaseCartItem,
      toggleCart,
    },
  } = useContext(CartContext);

  const {
    state: { mode },
  } = useContext(UserContext);

  const CartToggle = () =>
    mode === "buyer" && (
      <ButtonBase onClick={toggleCart}>ตะกร้า ({cart.length})</ButtonBase>
    );

  return {
    data: { cart, paymentAmount },
    action: {
      addCartItem,
      removeCartItem,
      increaseCartItem,
      decreaseCartItem,
      toggleCart,
    },
    component: { CartToggle },
  };
};

export default useCart;
