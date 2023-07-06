import { useState } from "react";
import styled from "styled-components/macro";

import Container from "@components/core/Container";
import Text from "@components/core/Text";
import TextField from "@components/core/TextField";
import ButtonBase from "@components/core/ButtonBase";

import UploadIcon from "@components/icons/Upload";

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

S.FormLabel = styled(Text).attrs({ as: "label" })``;

S.FormInput = styled(TextField)`
  margin-top: 8px;
  margin-bottom: 26px;
`;

S.CancelButton = styled(ButtonBase)`
  width: 100%;
  color: #e13b30;
  border: 1px solid #d9d9d9;
  background: #fff;
  margin-right: 12px;
  flex-shrink: 1;
`;

S.SubmitButton = styled(ButtonBase)`
  width: 100%;
  color: #fff;
  background: #e04132;
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
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    price: "",
    images: [],
  });

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSelectImages = (e) => {
    // let files = e.target.files;
    // const allowedExtensions = ["png", "jpg", "jpeg"];

    e.preventDefault();

    let files = e.target?.files ?? e.dataTransfer?.files;
    // if (files.length > 0) {
    //   setFiles([...files]);
    // }

    console.log(files);

    if (files.length > 6) {
      console.error("max is 6");
      return;
    }
  };

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
              onChange={handleSelectImages}
              onClick={(e) => (e.currentTarget.value = null)}
              multiple
            />
            <S.UploadGuideBox
              onDrop={handleSelectImages}
              onDragOver={handleDragOver}
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
          <S.SelectedImageCount>Image upload (0/6)</S.SelectedImageCount>
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
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price:
                  e.target.value && !isNaN(e.target.value)
                    ? parseInt(e.target.value)
                    : 0,
              })
            }
            placeholder="฿1,000"
          />
          <S.ActionButtonGroup>
            <S.CancelButton>ยกเลิก</S.CancelButton>
            <S.SubmitButton>ยืนยัน</S.SubmitButton>
          </S.ActionButtonGroup>
        </Container>
      </Container>
    </S.Wrapper>
  );
};

export default AddProduct;
