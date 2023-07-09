import styled from "styled-components/macro";
import { motion } from "framer-motion";

import { useContext } from "react";

import ButtonSolid from "@components/core/ButtonSolid";
import IconButton from "@components/core/IconButton";
import Text from "@components/core/Text";

import CloseIcon from "@components/icons/Close";
import MinusIcon from "@components/icons/Minus";
import PlusIcon from "@components/icons/Plus";

import { CartContext } from "@contexts/CartContext";

import { currencyFormat } from "@utils/currency";

const S = {};

S.CartBackdrop = styled(motion.div)`
  position: fixed;
  z-index: var(--zindex-drawer-backdrop);
  inset: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.7);
`;

S.CartWrapper = styled(motion.div)`
  position: fixed;
  z-index: var(--zindex-drawer);
  top: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  height: 100vh;

  @media (min-width: 600px) {
    max-width: 360px;
  }
`;

S.CartHeader = styled.div`
  padding: 24px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cccccc;
`;

S.CartItemsList = styled.div`
  height: calc(100vh - 72px - 94px);
  overflow-y: auto;
`;

S.CartItem = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
`;

S.ProductImage = styled.img`
  width: 65px;
  height: 65px;
  object-fit: cover;
  pointer-events: none;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 14px;
`;

S.ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`;

S.ProductName = styled(Text).attrs({
  as: "span",
})`
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

S.ProductCode = styled(Text).attrs({
  as: "span",
})`
  font-weight: 300;
  color: #6c6c70;
`;

S.ProductPrice = styled(Text).attrs({
  as: "span",
})`
  color: #e13b30;
  font-family: Prompt;
  font-weight: 600;
`;

S.ProductQuantity = styled.div`
  display: flex;
  align-items: center;
`;

S.CartFooter = styled.div`
  width: 100%;
  height: 94px;
  position: absolute;
  bottom: 0;
  padding: 24px;
  background-color: #fff;
`;

S.CheckoutButton = styled(ButtonSolid)`
  width: 100%;
`;

S.ActionButton = styled(IconButton)`
  width: 32px;
  height: 32px;
`;

const Cart = () => {
  const {
    data: { cart, paymentAmount },
    action: { toggleCart, increaseCartItem, decreaseCartItem, removeCartItem },
  } = useContext(CartContext);

  return (
    <>
      <S.CartBackdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={toggleCart}
      />
      <S.CartWrapper
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      >
        <S.CartHeader>
          <Text size={{ sm: 1.25 }} font="secondary">
            ตะกร้า ({cart.length})
          </Text>
          <IconButton onClick={toggleCart}>
            <CloseIcon />
          </IconButton>
        </S.CartHeader>
        <S.CartItemsList>
          {cart.map((item) => (
            <S.CartItem key={item.product._id}>
              <S.ProductImage
                src={item.product.images[0]}
                alt={item.product.name}
              />
              <S.ProductDetails>
                <S.ProductName>{item.product.name}</S.ProductName>
                <span style={{ lineHeight: 0.85 }}>
                  <S.ProductCode size={{ xs: 0.8 }}>
                    {item.product.code}{" "}
                  </S.ProductCode>
                  <S.ProductPrice size={{ xs: 0.9 }}>
                    {currencyFormat(item.product.price)}
                  </S.ProductPrice>
                </span>
                <S.ProductQuantity>
                  <S.ActionButton
                    onClick={() => decreaseCartItem(item.product)}
                    disabled={item.quantity === 1}
                  >
                    <MinusIcon size={12} />
                  </S.ActionButton>
                  <span style={{ paddingInline: 4 }}>{item.quantity}</span>
                  <S.ActionButton
                    onClick={() => increaseCartItem(item.product)}
                    disabled={item.product.quantity === item.quantity}
                  >
                    <PlusIcon size={12} />
                  </S.ActionButton>
                </S.ProductQuantity>
              </S.ProductDetails>
              <IconButton onClick={() => removeCartItem(item.product)}>
                <CloseIcon size={16} />
              </IconButton>
            </S.CartItem>
          ))}
        </S.CartItemsList>
        <S.CartFooter>
          <S.CheckoutButton onClick={toggleCart}>
            ชำระเงิน ({currencyFormat(paymentAmount)})
          </S.CheckoutButton>
        </S.CartFooter>
      </S.CartWrapper>
    </>
  );
};

export default Cart;
