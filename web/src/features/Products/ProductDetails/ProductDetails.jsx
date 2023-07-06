import { useState, useContext } from "react";
import styled from "styled-components/macro";

import { CartContext } from "@contexts/CartContext";

import Container from "@components/core/Container";

const S = {};

S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const {
    action: { addCardItem },
  } = useContext(CartContext);

  return (
    <S.Wrapper>
      <Container $maxWidth="xl"></Container>
    </S.Wrapper>
  );
};

export default ProductDetails;
