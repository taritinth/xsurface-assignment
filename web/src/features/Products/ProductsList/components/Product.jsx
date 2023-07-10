import styled from "styled-components/macro";

import Skeleton from "@components/core/Skeleton";
import IconButton from "@components/core/IconButton";

import ShoppingCartIcon from "@components/icons/ShoppingCart";

import { currencyFormat } from "@utils/currency";

import { useNavigate } from "react-router-dom";

const S = {};

S.ProductItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  /* transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.02);
  } */
`;

S.ProductImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  cursor: pointer;
`;

S.ProductImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

S.ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: min(16px, 2vw);
  min-width: 0;
`;

S.ProductName = styled(Text).attrs({
  as: "a",
})`
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

S.ProductCode = styled(Text).attrs({
  as: "span",
})`
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
  color: #e13b30;
  font-family: Prompt;
  font-weight: 600;
`;

S.AddToCartButton = styled(IconButton)`
  margin-right: 8px;
  width: 32px;
  height: 32px;
`;

const Product = ({ product, onAddCartItem, canAddCartItem, skeleton }) => {
  const navigate = useNavigate();

  return (
    <S.ProductItem>
      {skeleton ? (
        <Skeleton $height="100%" $aspectRatio={1} />
      ) : (
        <S.ProductImageWrapper
          onClick={() => navigate(`/products/${product._id}`)}
        >
          <S.ProductImage src={product.images[0]} alt={product.name} />
        </S.ProductImageWrapper>
      )}
      <S.ProductDetails>
        {skeleton ? (
          <Skeleton $borderRadius={8} />
        ) : (
          <S.ProductName
            size={{
              xs: 0.85,
              sm: 1,
            }}
            onClick={() => navigate(`/products/${product._id}`)}
          >
            {product.name}
          </S.ProductName>
        )}
        {skeleton ? (
          <Skeleton $width={100} $borderRadius={8} $marginTop={6} />
        ) : (
          <S.ProductCode
            size={{
              xs: 0.75,
              sm: 0.85,
            }}
          >
            {product.code}
          </S.ProductCode>
        )}
        <S.ProductItemFooter>
          {skeleton ? (
            <>
              <Skeleton
                $width={32}
                $height={32}
                $borderRadius="50%"
                $marginRight={12}
              />
              <Skeleton $width={100} $height={18} $borderRadius={8} />
            </>
          ) : (
            <>
              {canAddCartItem && (
                <S.AddToCartButton onClick={() => onAddCartItem(product, 1)}>
                  <ShoppingCartIcon />
                </S.AddToCartButton>
              )}
              <S.ProductPrice
                size={{
                  xs: 1,
                  sm: 1.25,
                }}
              >
                {currencyFormat(product.price)}
              </S.ProductPrice>
            </>
          )}
        </S.ProductItemFooter>
      </S.ProductDetails>
    </S.ProductItem>
  );
};

export default Product;
