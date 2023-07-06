import styled from "styled-components/macro";
import { forwardRef } from "react";

const S = {};

S.ButtonBase = styled.a`
  position: relative;
  font-size: 0.95rem;
  font-family: Prompt;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  flex-shrink: 0;

  color: black;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  width: fit-content;
  padding: 0px 24px;
  border-radius: 25px;

  &[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const ButtonBase = forwardRef(function ButtonBase(props, ref) {
  const { children, disabled, onClick, ...rest } = props;

  return (
    <S.ButtonBase
      ref={ref}
      onClick={(e) => {
        if (!disabled) {
          onClick?.();
        } else {
          e.preventDefault();
        }
      }}
      disabled={disabled}
      {...rest}
    >
      {children}
    </S.ButtonBase>
  );
});

export default ButtonBase;
