import styled from "styled-components/macro";
import ButtonBase from "@components/core/ButtonBase";

const IconButton = styled(ButtonBase).attrs((props) => ({
  size: props.size || 46,
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
  border-radius: ${(props) => (props.$circle ? "50%" : "none")};
  background-color: #fff;
`;

export default IconButton;
