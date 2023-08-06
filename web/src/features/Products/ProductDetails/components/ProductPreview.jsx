import { useState, useRef } from "react";
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
  /* background-image: url(${({ src }) => `"${src}"`});
  background-position: 0% 0%;
  background-size: contain;
  background-repeat: no-repeat; */
`;

S.ProductImageZoom = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fff;
  background-image: url(${({ src }) => `"${src}"`});
  background-position: 0% 0%;
  /* background-size: contain; */
  background-repeat: no-repeat;
  border: solid;
`;

S.ZoomerContainer = styled.div`
  position: relative;
`;

S.ProductImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  /* height: 100%; */
  /* pointer-events: none; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

  const [isHover, setIsHover] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const zoomerRef = useRef(null);

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
        console.log(slider.track.details, slider.track.details.rel);
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  const handleMouseMove = (e, index) => {
    setIsHover(true);

    console.log(e);

    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - 10) / width) * 100;
    const y = ((e.pageY - top - 4) / height) * 100;

    console.log("e.pageX, left", e.pageX, left);
    console.log("e.pageY, top", e.pageY, top);

    // let offsetX, offsetY;
    // var zoomer = e.currentTarget;
    // e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
    // e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageX);
    // let x = (offsetX / zoomer.offsetWidth) * 100;
    // let y = (offsetY / zoomer.offsetHeight) * 100;

    zoomerRef.current.style.backgroundPosition = x + "% " + y + "%";
    setPosition({
      idx: index,
      x: x + "%",
      y: y + "%",
    });

    console.log(x, y);
    // console.log(currentSlide, images[currentSlide]);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    zoomerRef.current.style.backgroundPosition = "0% 0%";
  };

  return (
    <>
      <S.ZoomerContainer>
        <S.SliderContainer ref={sliderRef} className="keen-slider">
          {images.map((image, index) => (
            <S.SliderItem key={index} className="keen-slider__slide">
              <S.ProductImageWrapper>
                <S.SlideProductImage
                  src={image}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                />
              </S.ProductImageWrapper>
            </S.SliderItem>
          ))}
        </S.SliderContainer>
        {isHover && (
          <S.ProductImageZoom
            // onMouseMove={handleMouseMove}
            // onMouseLeave={handleMouseLeave}
            ref={zoomerRef}
            src={images[position.idx]}
            style={{
              top: position.y,
              left: position.x,
            }}
          />
        )}
      </S.ZoomerContainer>
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
