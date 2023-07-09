import { useState, useContext } from "react";
import styled from "styled-components/macro";

import { UserContext } from "@contexts/UserContext";

import Container from "@components/core/Container";
import Text from "@components/core/Text";
import IconButton from "@components/core/IconButton";
import TextField from "@components/core/TextField";
import ButtonOutlined from "@components/core/ButtonOutlined";
import Skeleton from "@components/core/Skeleton";

import AltText from "@components/ui/AltText";
import ProductPreview from "./components/ProductPreview";

import MinusIcon from "@components/icons/Minus";
import PlusIcon from "@components/icons/Plus";

import { currencyFormat } from "@utils/currency";

import productAPI from "@lib/api/products";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useCart from "@hooks/useCart";

const S = {};

S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

S.ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  padding-bottom: 42px;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

S.ProductImageSection = styled.div`
  width: 100%;

  @media (min-width: 600px) {
    width: 40%;
    padding-right: 64px;
  }
`;

S.ProductDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #dbdbdb;
  border-radius: 25px;
  padding: 32px;
  height: fit-content;
  width: 100%;
  margin-top: 24px;

  @media (min-width: 600px) {
    width: 60%;
    margin-top: 0;
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
  text-transform: uppercase;
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

S.SelectQuantity = styled.div`
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
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(["product"], () => productAPI.getProductByID(id), {
    cacheTime: 0,
  });
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

  const handleDecreaseQty = () => {
    setQuantity((prev) => (prev -= 1));
  };

  const handleIncreaseQty = () => {
    setQuantity((prev) => (prev += 1));
  };

  const {
    action: { addCartItem },
  } = useCart();

  const {
    state: { mode },
  } = useContext(UserContext);

  if (isError) {
    return <AltText message="มีบางอย่างผิดพลาด" />;
  } else if (!isLoading && !product) {
    return <AltText message="ไม่มีสินค้านี้อยู่ในระบบ" />;
  }

  return (
    <S.Wrapper>
      <Container $maxWidth="xl">
        <S.ProductWrapper>
          <S.ProductImageSection>
            {isLoading ? (
              <Skeleton $aspectRatio={1} $borderRadius={8} />
            ) : (
              <ProductPreview images={product.images} />
            )}
          </S.ProductImageSection>
          <S.ProductDetailsSection>
            {isLoading ? (
              <>
                <Skeleton $width={300} $height={32} $borderRadius={8} />
                <Skeleton
                  $width={100}
                  $height={20}
                  $marginTop={6}
                  $borderRadius={8}
                />
                <Skeleton
                  $width={150}
                  $height={42}
                  $marginTop={12}
                  $borderRadius={8}
                />
              </>
            ) : (
              <>
                <S.ProductName size={{ xs: 1.2, sm: 1.4 }}>
                  {product.name}
                </S.ProductName>
                <S.ProductCode size={{ xs: 0.85, sm: 0.85 }}>
                  {product.code}
                </S.ProductCode>
                <S.ProductPrice size={{ xs: 1.5, sm: 1.75 }}>
                  {currencyFormat(product.price)}
                </S.ProductPrice>
              </>
            )}
            <S.SelectQuantity>
              {isLoading ? (
                <>
                  <Skeleton $width={40} $height={40} $borderRadius="50%" />
                  <Skeleton
                    $width={80}
                    $height={40}
                    $borderRadius={25}
                    $marginLeft={8}
                  />
                  <Skeleton
                    $width={40}
                    $height={40}
                    $borderRadius="50%"
                    $marginLeft={8}
                  />
                  <Skeleton
                    $width={100}
                    $height={16}
                    $borderRadius={8}
                    $marginLeft={8}
                  />
                </>
              ) : (
                <>
                  <S.ActionButton
                    onClick={handleDecreaseQty}
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
                    onClick={handleIncreaseQty}
                    disabled={mode !== "buyer" || product.quantity === quantity}
                  >
                    <PlusIcon size={12} />
                  </S.ActionButton>
                  <span style={{ marginLeft: 8 }}>
                    คลังสินค้า : {product.quantity}
                  </span>
                </>
              )}
            </S.SelectQuantity>
            {isLoading ? (
              <>
                <Skeleton
                  $width={150}
                  $height={46}
                  $marginTop={24}
                  $borderRadius={25}
                />
                <Skeleton
                  $width={300}
                  $height={16}
                  $marginTop={12}
                  $borderRadius={8}
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </S.ProductDetailsSection>
        </S.ProductWrapper>
      </Container>
    </S.Wrapper>
  );
};

export default ProductDetails;
