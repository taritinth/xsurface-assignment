import { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components/macro";
import { motion, AnimatePresence } from "framer-motion";

import Container from "@components/core/Container";
import Text from "@components/core/Text";
import TextField from "@components/core/TextField";
import ButtonOutlined from "@components/core/ButtonOutlined";
import ButtonSolid from "@components/core/ButtonSolid";
import IconButton from "@components/core/IconButton";

import UploadIcon from "@components/icons/Upload";
import CloseIcon from "@components/icons/Close";

import { validFileExtensions, formatBytes } from "@utils/file";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { UserContext } from "@contexts/UserContext";

import productAPI from "@lib/api/products";
import { RESPONSE } from "@constants/message";

const S = {};

S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

S.Title = styled(Text)`
  margin-top: 32px;
  margin-bottom: 26px;
`;

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

S.FormLabel = styled(Text).attrs({ as: "label" })``;

S.FormInput = styled(TextField)`
  margin-top: 8px;
  margin-bottom: 26px;
`;

S.CancelButton = styled(ButtonOutlined)`
  width: 100%;
  margin-right: 12px;
  flex-shrink: 1;
`;

S.SubmitButton = styled(ButtonSolid)`
  width: 100%;
  flex-shrink: 1;
`;

S.ActionButtonGroup = styled.div`
  margin: 52px auto 0;
  padding: 16px 0;
  display: flex;
  justify-content: center;

  &:not(:last-child) {
    margin-right: 16px;
  }

  @media (min-width: 600px) {
    max-width: 400px;
  }
`;

const AddProduct = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    price: "",
    images: [],
  });
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    let files = [...(e.target?.files ?? e.dataTransfer?.files ?? [])];

    const allowedExtensions = ["png", "jpg", "jpeg"];
    if (files.some((file) => !validFileExtensions(file, allowedExtensions))) {
      enqueueSnackbar(
        `File type is not allowed. Only accept ${allowedExtensions.join(
          ", "
        )}.`,
        {
          variant: "error",
        }
      );
      return;
    } else if (files.some((file) => file.size > 52428800)) {
      enqueueSnackbar("File size is too large. Max file size is 50MB", {
        variant: "error",
      });
      return;
    } else if (files.length + formData.images.length > 6) {
      enqueueSnackbar("Maximum number of files is 6 files", {
        variant: "error",
      });
      return;
    }
    handleSelectImages(files);
  };

  const handleSelectImages = (files) => {
    setFormData({
      ...formData,
      images: [...formData.images, ...files],
    });
  };

  const handleDeleteImage = (index) => {
    let newSelected = formData.images;
    newSelected.splice(index, 1);

    setFormData({
      ...formData,
      images: newSelected,
    });
  };

  const updateProduct = async () => {
    if (
      !formData.name
      //  ||
      // !formData.code
      // ||
      // !formData.price ||
      // formData.images.length === 0
    ) {
      enqueueSnackbar("Please complete all fields before submit.", {
        variant: "error",
      });
      return;
    }

    try {
      const data = new FormData();

      for (const field in formData) {
        if (field === "images") {
          formData.images.forEach((image) => {
            data.append(`images`, image);
          });
        } else {
          data.append(field, formData[field]);
        }
      }

      await productAPI.addProduct(data);

      enqueueSnackbar(RESPONSE.SAVE_SUCCESS, {
        variant: "success",
      });
      navigate("/products");
    } catch (err) {
      console.error(err);
    }
  };

  const {
    state: { mode },
  } = useContext(UserContext);

  useEffect(() => {
    if (mode !== "seller") navigate("/products");
  }, [mode]);

  return (
    <S.Wrapper>
      <Container $maxWidth="xl">
        <S.Title as="h1" size={{ xs: 1.25, sm: 1.5 }} weight={600}>
          Update Product
        </S.Title>
        <Container $maxWidth="lg">
          <S.UploadBox>
            <input
              id="imagesFieldHandle"
              type="file"
              accept=".jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={handleDrop}
              onClick={(e) => (e.currentTarget.value = null)}
              multiple
            />
            <S.UploadGuideBox
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
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
            Image upload ({formData.images.length}/6)
          </S.SelectedImageCount>
          <S.SelectedImagesListContainer>
            <AnimatePresence>
              {formData.images.map((image, index) => (
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
                    onClick={() => handleDeleteImage(index)}
                  >
                    <CloseIcon color="#FFF" size={16} />
                  </S.DeleteSelectedImageButton>
                </S.SelectedImageItemWrapper>
              ))}
            </AnimatePresence>
          </S.SelectedImagesListContainer>
          <S.FormLabel>Product Name</S.FormLabel>
          <S.FormInput
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Product Name"
          />
          <S.FormLabel>Code</S.FormLabel>
          <S.FormInput
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder="Code"
          />
          <S.FormLabel>Price</S.FormLabel>
          <S.FormInput
            type="number"
            value={formData.price}
            onChange={(e) => {
              setFormData({
                ...formData,
                price: e.target.value,
              });
            }}
            placeholder="฿1,000"
          />
          <S.ActionButtonGroup>
            <S.CancelButton onClick={() => navigate(-1)}>ยกเลิก</S.CancelButton>
            <S.SubmitButton onClick={updateProduct}>ยืนยัน</S.SubmitButton>
          </S.ActionButtonGroup>
        </Container>
      </Container>
    </S.Wrapper>
  );
};

export default AddProduct;
