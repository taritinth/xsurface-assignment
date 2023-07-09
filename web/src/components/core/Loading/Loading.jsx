import styled, { keyframes } from "styled-components/macro";

const loadingKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const S = {};

S.LoadingBackdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: var(--zindex-loading-backdrop);
`;

S.LoadingIndicator = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  &::after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${loadingKeyframes} 1.2s linear infinite;
  }
`;

const Loading = () => {
  return (
    <S.LoadingBackdrop>
      <S.LoadingIndicator />
    </S.LoadingBackdrop>
  );
};

export default Loading;
