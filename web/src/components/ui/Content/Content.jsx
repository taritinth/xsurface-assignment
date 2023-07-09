import styled from "styled-components/macro";

const S = {};

S.Content = styled.div`
  padding-top: 64px;
  display: flex;
  flex-direction: column;
`;

const Content = ({ children }) => {
  return <S.Content>{children}</S.Content>;
};

export default Content;
