import styled, { css } from "styled-components/macro";

const getBreakpoints = (variant) => {
  const defaultVariants = {
    sm: 600,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1440,
    "3xl": 1536,
  };
  return defaultVariants[variant];
};

/**
 * @params $maxWidth e.g. sm, md, lg, xl, 2xl, 3xl
 */
const Container = styled.div`
  position: relative;
  width: calc(100% - 64px);
  margin: 0 auto;

  @media (max-width: 600px) {
    width: calc(100% - 32px);
  }

  ${(props) =>
    props.$maxWidth &&
    css`
      max-width: ${getBreakpoints(props.$maxWidth)}px;
    `}
`;

export default Container;
