import { useState } from "react";
import styled from "styled-components/macro";

import IconButton from "@components/core/IconButton";

import ChevronLeftIcon from "@components/icons/ChevronLeft";
import ChevronRightIcon from "@components/icons/ChevronRight";

import { useKeenSlider } from "keen-slider/react";

const S = {};

S.SliderContainer = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  touch-action: pan-y;
  user-select: none;
  width: 100%;
`;

S.SliderItem = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  font-weight: 500;
  /* height: 200px; */
  max-height: 100vh;
`;

S.ThumbSliderItem = styled(S.SliderItem)`
  cursor: pointer;
  font-size: 30px;
`;

S.ProductImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

S.ProductImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

S.SlideProductImage = styled(S.ProductImage)`
  object-fit: contain;
`;

S.ThumbProductImage = styled(S.ProductImage)`
  object-fit: cover;
`;

S.ArrowButton = styled(IconButton)`
  height: 32px;
  width: 32px;
  background-color: #dbdbdb;
`;

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const NextArrow = ({ onClick, disabled }) => {
  return (
    <S.ArrowButton
      style={{
        right: 0,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <ChevronRightIcon color="#000" size={20} />
    </S.ArrowButton>
  );
};

const PrevArrow = ({ onClick, disabled }) => {
  return (
    <S.ArrowButton
      style={{
        left: 0,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <ChevronLeftIcon color="#000" size={20} />
    </S.ArrowButton>
  );
};

const ProductPreview = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    drag: false,
  });
  const [thumbnailRef] = useKeenSlider(
    {
      rubberband: false,
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <>
      <S.SliderContainer ref={sliderRef} className="keen-slider">
        {images.map((image, index) => (
          <S.SliderItem key={index} className="keen-slider__slide">
            <S.ProductImageWrapper>
              <S.SlideProductImage src={image} />
            </S.ProductImageWrapper>
          </S.SliderItem>
        ))}
      </S.SliderContainer>
      <S.SliderContainer
        ref={thumbnailRef}
        className="keen-slider thumbnail"
        style={{
          marginTop: 24,
        }}
      >
        {images.map((image, index) => (
          <S.ThumbSliderItem key={index} className="keen-slider__slide">
            <S.ProductImageWrapper>
              <S.ThumbProductImage src={image} />
            </S.ProductImageWrapper>
          </S.ThumbSliderItem>
        ))}

        {loaded && instanceRef.current && (
          <>
            <PrevArrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <NextArrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </S.SliderContainer>
    </>
  );
};

export default ProductPreview;
