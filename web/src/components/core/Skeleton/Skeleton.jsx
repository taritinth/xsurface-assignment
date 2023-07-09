import styled, { keyframes } from "styled-components/macro";

const skeletonKeyframes = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const skeletonAttrs = (props) => ({
  $height: props.$height ?? 16,
  $width: props.$width ?? `100%`,
  $borderRadius: props.$borderRadius ?? 0,
  $marginBottom: props.$marginBottom ?? 0,
  $marginTop: props.$marginTop ?? 0,
  $marginLeft: props.$marginLeft ?? 0,
  $marginRight: props.$marginRight ?? 0,
});

const S = {};

S.Skeleton = styled.div.attrs(skeletonAttrs)`
  display: inline-block;
  height: ${(props) =>
    isNaN(props.$height) ? props.$height : `${props.$height}px`};
  width: ${(props) =>
    isNaN(props.$width) ? props.$width : `${props.$width}px`};
  padding-top: ${(props) =>
    props.$aspectRatio && `calc(100% / calc(${props.$aspectRatio}))`};
  background-color: rgba(0, 0, 0, 0.1);
  animation: ${skeletonKeyframes} 1.3s ease-in-out infinite;
  border-radius: ${(props) =>
    isNaN(props.$borderRadius)
      ? props.$borderRadius
      : `${props.$borderRadius}px`};
  margin-bottom: ${(props) =>
    isNaN(props.$marginBottom)
      ? props.$marginBottom
      : `${props.$marginBottom}px`};
  margin-top: ${(props) =>
    isNaN(props.$marginTop) ? props.$marginTop : `${props.$marginTop}px`};
  margin-left: ${(props) =>
    isNaN(props.$marginLeft) ? props.$marginLeft : `${props.$marginLeft}px`};
  margin-right: ${(props) =>
    isNaN(props.$marginRight) ? props.$marginRight : `${props.$marginRight}px`};
  ${({ ready }) => ready && `display: none;`}
`;

const Skeleton = (props) => {
  return <S.Skeleton {...props} />;
};

export default Skeleton;
