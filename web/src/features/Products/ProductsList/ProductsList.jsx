import { useContext, useState } from "react";
import styled from "styled-components/macro";

import Container from "@components/core/Container";
import Text from "@components/core/Text";
import TextField from "@components/core/TextField";
import ButtonOutlined from "@components/core/ButtonOutlined";

import SearchIcon from "@components/icons/Search";

import Product from "./components/Product";

import { UserContext } from "@contexts/UserContext";

import productAPI from "@lib/api/products";

import useCart from "@hooks/useCart";
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

  const {
    action: { addCartItem },
  } = useCart();

  const {
    state: { mode },
  } = useContext(UserContext);

  let content;

  if (isLoading) {
    content = <div>กำลังโหลด...</div>;
  } else if (products.length === 0) {
    content = <div>ไม่มีรายการสินค้าที่ค้นหา</div>;
  } else {
    content = (
      <S.ProductsListContainer>
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            onAddCartItem={addCartItem}
            canAddCartItem={mode === "buyer"}
          />
        ))}
      </S.ProductsListContainer>
    );
  }

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
        {content}
      </Container>
    </S.Wrapper>
  );
};

export default ProductsList;
