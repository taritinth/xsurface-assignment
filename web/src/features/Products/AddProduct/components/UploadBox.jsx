import styled, { css } from "styled-components/macro";
import { motion, AnimatePresence } from "framer-motion";

import Text from "@components/core/Text";
import IconButton from "@components/core/IconButton";

import UploadIcon from "@components/icons/Upload";
import CloseIcon from "@components/icons/Close";

import { formatBytes } from "@utils/file";

const S = {};

S.UploadBox = styled.div`
  margin-top: 24px;
  position: relative;
  padding-top: 30%;
  border: 1px dashed #d9d9d9;
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: 600px) {
    padding-top: 50%;
  }
`;

S.UploadGuideBox = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.$isDragOver &&
    css`
      background-color: #e4e4e4;
    `}
`;

S.UploadHelperText = styled(Text).attrs({ as: "span" })`
  color: #6c6c70;
  letter-spacing: 0.4px;
  margin-top: 12px;
`;

S.SelectedImageCount = styled(Text).attrs({ as: "h6" })`
  color: #6c6c70;
  font-size: 0.75rem;
  font-weight: 300;
  margin: 8px 0 24px;
  text-align: right;
`;

S.SelectedImagesListContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 36px;
`;

S.SelectedImageItemWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 8px;
  padding: 8px;
`;

S.SelectedImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

S.SelectedImageSize = styled(Text)`
  font-size: 0.8rem;
  margin-top: 6px;
`;

S.DeleteSelectedImageButton = styled(IconButton)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: -12px;
  right: -12px;
  background-color: #e04132;
`;

const UploadBox = ({
  isDragOver,
  onDrop,
  onDragOver,
  onDragLeave,
  selectedFiles,
  onDeleteSelected,
}) => {
  return (
    <>
      <S.UploadBox>
        <input
          id="imagesFieldHandle"
          type="file"
          accept=".jpg,.jpeg,.png"
          style={{ display: "none" }}
          onChange={onDrop}
          onClick={(e) => (e.currentTarget.value = null)}
          multiple
        />
        <S.UploadGuideBox
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          $isDragOver={isDragOver}
        >
          <UploadIcon size={26} color="#6C6C70" />
          <S.UploadHelperText size={{ xs: 0.9 }}>
            Drag & Drop or{" "}
            <label
              style={{
                color: "#005FCC",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              htmlFor="imagesFieldHandle"
            >
              Choose file
            </label>{" "}
            to upload
          </S.UploadHelperText>
          <S.UploadHelperText size={{ xs: 0.75 }} weight={300}>
            JPG. or PNG Maximum file size 50MB.
          </S.UploadHelperText>
        </S.UploadGuideBox>
      </S.UploadBox>
      <S.SelectedImageCount>
        Image upload ({selectedFiles.length}/6)
      </S.SelectedImageCount>
      <S.SelectedImagesListContainer>
        <AnimatePresence>
          {selectedFiles.map((image, index) => (
            <S.SelectedImageItemWrapper
              transition={{ type: "spring", bounce: 0.25, duration: 0.2 }}
              layout
              key={index}
            >
              <S.SelectedImage src={URL.createObjectURL(image)} />
              <S.SelectedImageSize>
                {formatBytes(image.size)}
              </S.SelectedImageSize>
              <S.DeleteSelectedImageButton
                onClick={() => onDeleteSelected(index)}
              >
                <CloseIcon color="#FFF" size={16} />
              </S.DeleteSelectedImageButton>
            </S.SelectedImageItemWrapper>
          ))}
        </AnimatePresence>
      </S.SelectedImagesListContainer>
    </>
  );
};

export default UploadBox;
