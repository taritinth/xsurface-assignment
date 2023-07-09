import { useState, useContext } from "react";
import styled from "styled-components/macro";

import { CartContext } from "@contexts/CartContext";
import { UserContext } from "@contexts/UserContext";

import Container from "@components/core/Container";
import Text from "@components/core/Text";
import IconButton from "@components/core/IconButton";
import TextField from "@components/core/TextField";
import ButtonOutlined from "@components/core/ButtonOutlined";

import MinusIcon from "@components/icons/Minus";
import PlusIcon from "@components/icons/Plus";

import { currencyFormat } from "@utils/currency";

import productAPI from "@lib/api/products";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const S = {};

S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

S.ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

S.ProductImageSection = styled.div`
  width: 100%;

  @media (min-width: 600px) {
    width: 50%;
  }
`;

S.ProductDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #dbdbdb;
  border-radius: 25px;
  padding: 32px;

  width: 100%;

  @media (min-width: 600px) {
    width: 50%;
  }
`;

S.ProductName = styled(Text).attrs({
  as: "h1",
})`
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

S.ProductCode = styled(Text).attrs({
  as: "span",
})`
  margin-top: 6px;
  font-weight: 300;
  color: #6c6c70;
`;

S.ProductItemFooter = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  align-self: flex-end;
`;

S.ProductPrice = styled(Text).attrs({
  as: "span",
})`
  margin-top: 12px;
  color: #e13b30;
  font-family: Prompt;
  font-weight: 600;
`;

S.ProductQuantity = styled.div`
  display: flex;
  align-items: center;
  margin-top: 64px;
`;

S.QuantityTextField = styled(TextField)`
  margin: 0 8px;
  width: 80px;
  height: 40px;
`;

S.ActionButton = styled(IconButton).attrs({ $circle: true })`
  width: 40px;
  height: 40px;
  border: 1px solid #dbdbdb;
`;

S.AddToCartButton = styled(ButtonOutlined)`
  margin-top: 24px;
`;

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery(["products"], () =>
    productAPI.getProductByID(id)
  );
  //   const [product, setProduct] = useState({
  //     _id: 5,
  //     name: "Light Blue Denim",
  //     code: "W-3271",
  //     price: 9000,
  //     quantity: 8,
  //     images: [
  //       "https://product-xsurface.s3.ap-southeast-1.amazonaws.com/fullSheet-1604886026831-W-3271.jpg",
  //     ],
  //   });
  const [quantity, setQuantity] = useState(1);

  const handleUpdateQty = (e) => {
    let qtyValue = parseInt(e.target.value);
    if (qtyValue < 1 || isNaN(qtyValue)) {
      qtyValue = 1;
    } else if (qtyValue > product.quantity) {
      qtyValue = product.quantity;
    }
    setQuantity(qtyValue);
  };

  const {
    action: { addCartItem },
  } = useContext(CartContext);

  const {
    state: { mode },
  } = useContext(UserContext);

  return (
    <S.Wrapper>
      <Container $maxWidth="xl">
        {isLoading ? (
          <div>กำลังโหลด...</div>
        ) : (
          <S.ProductWrapper>
            <S.ProductImageSection></S.ProductImageSection>
            <S.ProductDetailsSection>
              <S.ProductName size={{ xs: 1.2, sm: 1.4 }}>
                {product.name}
              </S.ProductName>
              <S.ProductCode size={{ xs: 0.85, sm: 0.85 }}>
                {product.code}
              </S.ProductCode>
              <S.ProductPrice size={{ xs: 1.5, sm: 1.75 }}>
                {currencyFormat(product.price)}
              </S.ProductPrice>
              <S.ProductQuantity>
                <S.ActionButton
                  onClick={() => setQuantity((prev) => (prev -= 1))}
                  disabled={mode !== "buyer" || quantity === 1}
                >
                  <MinusIcon size={12} />
                </S.ActionButton>
                <S.QuantityTextField
                  value={quantity}
                  onChange={handleUpdateQty}
                  disabled={mode !== "buyer"}
                />
                <S.ActionButton
                  onClick={() => setQuantity((prev) => (prev += 1))}
                  disabled={mode !== "buyer" || product.quantity === quantity}
                >
                  <PlusIcon size={12} />
                </S.ActionButton>
                <span style={{ marginLeft: 8 }}>
                  คลังสินค้า : {product.quantity}
                </span>
              </S.ProductQuantity>
              <S.AddToCartButton
                onClick={() => addCartItem(product, quantity)}
                disabled={mode !== "buyer"}
              >
                เพิ่มลงตะกร้า
              </S.AddToCartButton>
              {mode !== "buyer" && (
                <Text
                  as="span"
                  style={{ marginTop: 12 }}
                  size={{ xs: 0.8 }}
                  font="secondary"
                >
                  *เปิดโหมดผู้ซื้อเพื่อใช้งานฟังก์ชันตะกร้าสินค้า
                </Text>
              )}
            </S.ProductDetailsSection>
          </S.ProductWrapper>
        )}
      </Container>
    </S.Wrapper>
  );
};

export default ProductDetails;
