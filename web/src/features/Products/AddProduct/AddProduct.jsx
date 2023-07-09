import { useState, useEffect, useContext } from "react";
import styled from "styled-components/macro";

import Container from "@components/core/Container";
import Text from "@components/core/Text";
import TextField from "@components/core/TextField";
import ButtonOutlined from "@components/core/ButtonOutlined";
import ButtonSolid from "@components/core/ButtonSolid";

import UploadBox from "./components/UploadBox";

import { UserContext } from "@contexts/UserContext";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import productAPI from "@lib/api/products";
import { validFileExtensions } from "@utils/file";
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
      !formData.name ||
      !formData.code ||
      !formData.price ||
      formData.images.length === 0
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
          <UploadBox
            isDragOver={isDragOver}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            selectedFiles={formData.images}
            onDeleteSelected={handleDeleteImage}
          />
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
