import styled from "styled-components/macro";
import { forwardRef } from "react";

const S = {};

S.TextField = styled.div`
  position: relative;
  width: 100%;
  height: 46px;
  border-radius: 25px;
  background-color: #fff;
`;

S.Icon = styled.div`
  position: absolute;
  width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
`;

S.Input = styled.input`
  font-size: 0.95rem;
  width: 100%;
  height: 100%;
  padding: 12px 24px;
  ${(props) => props.$Icon && `padding-left: 56px;`}
  border-radius: 25px;
  border: 1px #d9d9d9 solid;
  outline: transparent;
  &:focus {
    outline: 1px #d9d9d9 solid;
  }
  &::placeholder {
    color: #bdbdbd;
  }
`;

const TextField = forwardRef(function TextField(props, ref) {
  const { className, $Icon, ...rest } = props;
  return (
    <S.TextField className={className}>
      {$Icon && (
        <S.Icon>
          <$Icon color="#BCBCC0" size={18} />
        </S.Icon>
      )}
      <S.Input $Icon={$Icon} ref={ref} {...rest} />
    </S.TextField>
  );
});

export default TextField;
