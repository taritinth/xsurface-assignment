import { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";

import Container from "@components/core/Container";
import Text from "@components/core/Text";
import TextField from "@components/core/TextField";
import ButtonOutlined from "@components/core/ButtonOutlined";
import IconButton from "@components/core/IconButton";

import SearchIcon from "@components/icons/Search";
import ShoppingCartIcon from "@components/icons/ShoppingCart";

import { currencyFormat } from "@utils/currency";

import { CartContext } from "@contexts/CartContext";
import { UserContext } from "@contexts/UserContext";

import productAPI from "@lib/api/products";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@hooks/useDebounce";

const S = {};

S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

S.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.Title = styled(Text)`
  margin-top: 32px;
  margin-bottom: 26px;
`;

S.SearchInput = styled(TextField)``;

S.ProductsListContainer = styled.div`
  margin-top: 40px;
  display: grid;
  column-gap: 12px;
  row-gap: 32px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding-bottom: 42px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

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

const ProductsList = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  // const [products, setProducts] = useState([
  //   {
  //     _id: 1,
  //     name: "Natural Lah La Dak North Cotton",
  //     code: "XK-17001TX",
  //     price: 1590,
  //     quantity: 10,
  //     images: [
  //       "https://product-xsurface.s3.ap-southeast-1.amazonaws.com/$product_image_1649413386661.jpeg",
  //     ],
  //   },
  //   {
  //     _id: 2,
  //     name: "Charcoal Cotton",
  //     code: "XK-17006TX",
  //     price: 1590,
  //     quantity: 5,
  //     images: [
  //       "https://product-xsurface.s3.ap-southeast-1.amazonaws.com/$product_image_1649413230687.jpeg",
  //     ],
  //   },
  //   {
  //     _id: 3,
  //     name: "Mocha Cotton",
  //     code: "XK-17004TX",
  //     price: 990,
  //     quantity: 1,
  //     images: [
  //       "https://product-xsurface.s3.ap-southeast-1.amazonaws.com/fullSheet-1604886026761-XK-17004TX.jpg",
  //     ],
  //   },
  //   {
  //     _id: 4,
  //     name: "Ivory Tweed",
  //     code: "XK-17007SW",
  //     price: 1590,
  //     quantity: 5,
  //     images: [
  //       "https://product-xsurface.s3.ap-southeast-1.amazonaws.com/$product_image_1649413144090.jpeg",
  //     ],
  //   },
  //   {
  //     _id: 5,
  //     name: "Light Blue Denim",
  //     code: "W-3271",
  //     price: 9000,
  //     quantity: 8,
  //     images: [
  //       "https://product-xsurface.s3.ap-southeast-1.amazonaws.com/fullSheet-1604886026831-W-3271.jpg",
  //     ],
  //   },
  // ]);

  const { data: products, isLoading } = useQuery(
    ["products", debouncedSearch],
    () =>
      productAPI.getProducts({
        q: searchTerm,
      })
  );

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     clearTimeout(handleSearchingTimeout.current);
  //     handleSearchingTimeout.current = setTimeout(async () => {
  //       try {
  //         const results = await productAPI.getProducts({
  //           q: searchTerm,
  //         });
  //         setProducts(results);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }, 400);
  //   };
  //   fetchProducts();
  // }, [searchTerm]);

  const {
    action: { addCartItem },
  } = useContext(CartContext);

  const {
    state: { mode },
  } = useContext(UserContext);

  return (
    <S.Wrapper>
      <Container $maxWidth="xl">
        <S.Header>
          <S.Title as="h1" size={{ xs: 1.25, sm: 1.5 }} weight={600}>
            Product List
          </S.Title>
          {mode === "seller" && (
            <ButtonOutlined onClick={() => navigate("/products/new")}>
              เพิ่มสินค้า
            </ButtonOutlined>
          )}
        </S.Header>
        <S.SearchInput
          $Icon={SearchIcon}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Name, Code"
        />
        <S.ProductsListContainer>
          {isLoading ? (
            <div>กำลังโหลด...</div>
          ) : products.length === 0 ? (
            <div>ไม่มีรายการสินค้าที่ค้นหา</div>
          ) : (
            products.map((item) => (
              <S.ProductItem key={item._id}>
                <S.ProductImageWrapper
                  onClick={() => navigate(`/products/${item._id}`)}
                >
                  <S.ProductImage src={item.images[0]} alt={item.name} />
                </S.ProductImageWrapper>
                <S.ProductDetails>
                  <S.ProductName
                    size={{
                      xs: 0.85,
                      sm: 1,
                    }}
                    onClick={() => navigate(`/products/${item._id}`)}
                  >
                    {item.name}
                  </S.ProductName>
                  <S.ProductCode
                    size={{
                      xs: 0.75,
                      sm: 0.85,
                    }}
                  >
                    {item.code}
                  </S.ProductCode>
                  <S.ProductItemFooter>
                    {mode === "buyer" && (
                      <S.AddToCartButton onClick={() => addCartItem(item, 1)}>
                        <ShoppingCartIcon />
                      </S.AddToCartButton>
                    )}
                    <S.ProductPrice
                      size={{
                        xs: 1,
                        sm: 1.25,
                      }}
                    >
                      {currencyFormat(item.price)}
                    </S.ProductPrice>
                  </S.ProductItemFooter>
                </S.ProductDetails>
              </S.ProductItem>
            ))
          )}
        </S.ProductsListContainer>
      </Container>
    </S.Wrapper>
  );
};

export default ProductsList;
