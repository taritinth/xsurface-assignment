import styled from "styled-components/macro";

const S = {};

S.AltTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vh;
`;

const AltText = ({ message }) => {
  return <S.AltTextWrapper>{message}</S.AltTextWrapper>;
};

export default AltText;
