import { useContext } from "react";
import styled from "styled-components/macro";

import {
  Link,
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import { UserContext } from "@contexts/UserContext";
import { CartContext } from "@contexts/CartContext";

import Container from "@components/core/Container";
import Products from "@features/Products/ProductsList";
import AddProduct from "@features/Products/AddProduct";
import ProductDetails from "@features/Products/ProductDetails";

import ButtonBase from "@components/core/ButtonBase";

const S = {};

S.Container = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

S.Navbar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  z-index: var(--zindex-navbar);
  box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 4px;
`;

S.NavBrand = styled(Link)`
  cursor: pointer;
  margin-right: 18px;
`;

S.NavItemGroup = styled.div`
  display: flex;
  align-items: center;
`;

S.Content = styled.div`
  padding-top: 64px;
  display: flex;
  flex-direction: column;
`;

S.ModeSelection = styled.div`
  display: flex;
`;

S.ModeItem = styled.span`
  color: ${({ $active }) => ($active ? "#000" : "#595959")};
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  font-size: 0.85rem;
  cursor: pointer;

  &:first-child::after {
    content: "";
    border-left: 1px solid;
    margin: 0 8px;
  }
`;

function App() {
  const routes = (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/new" element={<AddProduct />} />
      </Routes>
    </>
  );
  const {
    state: { mode },
    action: { setMode },
  } = useContext(UserContext);

  const {
    data: { cart },
    action: { toggleCart },
  } = useContext(CartContext);

  return (
    <>
      <Router>
        <S.Navbar>
          <S.Container $maxWidth="xl">
            <S.NavItemGroup>
              <S.NavBrand to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={155}
                  height={31}
                  fill="none"
                >
                  <path
                    fill="#E13B30"
                    d="m51.536 15.021 4.885 7.972h-2.314l-3.771-6.171-3.6 6.17H44.42l4.886-7.97-4.886-7.972h2.315l3.857 6.257 3.514-6.171h2.314l-4.885 7.885Z"
                  />
                  <path
                    fill="#252525"
                    d="M61.65 22.564c-.857-.343-1.457-.857-1.971-1.543-.515-.685-.686-1.457-.772-2.314h2.229c.085.772.343 1.372.943 1.886.514.514 1.285.771 2.4.771 1.028 0 1.8-.257 2.314-.771.6-.514.857-1.114.857-1.886 0-.6-.171-1.114-.514-1.457-.343-.343-.772-.686-1.286-.857-.514-.172-1.2-.429-2.057-.6-1.029-.257-1.886-.514-2.486-.857a3.89 3.89 0 0 1-1.628-1.286c-.429-.6-.686-1.371-.686-2.4 0-.857.257-1.628.686-2.314.428-.686 1.028-1.2 1.885-1.543.772-.343 1.715-.514 2.743-.514 1.457 0 2.743.343 3.686 1.114.943.771 1.457 1.714 1.629 3h-2.315c-.085-.6-.428-1.114-.943-1.629-.6-.428-1.285-.685-2.228-.685-.857 0-1.543.257-2.143.685a2.456 2.456 0 0 0-.857 1.886c0 .6.171 1.029.514 1.457.343.343.772.686 1.2.857.514.172 1.114.429 2.057.686 1.029.257 1.886.6 2.572.857.6.257 1.2.686 1.628 1.286.429.6.686 1.371.686 2.4 0 .771-.172 1.543-.6 2.229-.429.685-1.029 1.2-1.8 1.628-.772.429-1.714.6-2.829.6-1.114-.086-2.057-.257-2.914-.686ZM75.107 7.136v10.028c0 1.457.343 2.486 1.029 3.172.686.686 1.628 1.028 2.914 1.028 1.2 0 2.143-.343 2.829-1.028.685-.686 1.028-1.714 1.028-3.172V7.136h2.057v10.028c0 1.286-.257 2.4-.771 3.343-.514.943-1.286 1.543-2.143 2.057-.943.343-1.971.6-3.086.6a7.394 7.394 0 0 1-3.085-.685c-.943-.429-1.629-1.115-2.143-2.057a7.301 7.301 0 0 1-.772-3.258V7.136h2.143ZM97.05 22.993l-3.772-6.514h-2.485v6.514h-2.057V7.136h5.142c1.2 0 2.229.171 3.086.6.857.428 1.457.943 1.886 1.628.428.686.6 1.457.6 2.4 0 1.115-.343 2.058-.943 2.915-.6.857-1.543 1.371-2.829 1.628l4.029 6.686H97.05Zm-6.257-8.143h3.085c1.115 0 1.972-.257 2.572-.857.6-.514.857-1.286.857-2.229 0-.942-.257-1.714-.857-2.228-.514-.515-1.371-.772-2.572-.772h-3.085v6.086ZM111.793 7.136V8.85h-6.943v5.4h5.572v1.714h-5.572v7.2h-2.057V7.136h9ZM122.85 19.479h-6.943l-1.286 3.514h-2.228l5.743-15.772h2.4l5.743 15.772h-2.229l-1.2-3.514Zm-.6-1.715-2.914-8.057-2.915 8.057h5.829ZM128.25 10.822c.686-1.2 1.629-2.229 2.829-2.915 1.2-.685 2.571-1.028 4.028-1.028 1.714 0 3.257.428 4.543 1.285 1.286.858 2.229 2.058 2.829 3.6h-2.486a5.371 5.371 0 0 0-1.886-2.228c-.857-.514-1.8-.772-3-.772-1.114 0-2.143.258-3 .772-.857.514-1.543 1.286-2.057 2.228-.514.943-.771 2.058-.771 3.343 0 1.286.257 2.4.771 3.343.514.943 1.2 1.714 2.057 2.229.857.514 1.886.771 3 .771s2.143-.257 3-.771c.857-.515 1.457-1.286 1.886-2.229h2.486c-.6 1.543-1.543 2.657-2.829 3.514-1.286.858-2.829 1.286-4.543 1.286-1.457 0-2.828-.343-4.028-1.029a7.136 7.136 0 0 1-2.829-2.914c-.686-1.2-1.029-2.657-1.029-4.2 0-1.628.343-3 1.029-4.285ZM147.879 8.764v5.315h5.828v1.714h-5.828v5.486h6.514v1.714h-8.571V7.05h8.571v1.714h-6.514ZM22.736 13.307c.943.943.943 2.4 0 3.343l-5.229 5.229-1.371 1.371-6.086 6.086c-.943.943-2.4.943-3.343 0l-6-6a2.329 2.329 0 0 1 0-3.343L5.68 15.02.707 10.05a2.329 2.329 0 0 1 0-3.343l6-6a2.329 2.329 0 0 1 3.343 0l5.143 5.143-1.372 1.371-5.4-5.485-6.6 6.6 4.972 4.971c.943.943.943 2.4 0 3.343L1.82 21.707l6.6 6.6 6.429-6.428 6.943-6.943-4.8-4.8 1.371-1.372c.257.429 2.657 2.829 4.372 4.543Z"
                  />
                  <path
                    fill="#252525"
                    d="M9.45 16.736a2.432 2.432 0 0 1 0-3.429l5.143-5.143 1.371-1.371 6-6a2.432 2.432 0 0 1 3.429 0l5.914 5.914a2.431 2.431 0 0 1 0 3.429l-4.885 4.885 4.885 4.886a2.431 2.431 0 0 1 0 3.429l-5.914 5.914a2.432 2.432 0 0 1-3.429 0l-5.142-5.143 1.37-1.371 5.487 5.485 6.685-6.685-4.885-4.886a2.432 2.432 0 0 1 0-3.429l4.885-4.885-6.6-6.6-6.428 6.428-6.943 6.943 4.8 4.8-1.371 1.2-4.372-4.371Z"
                  />
                  <path
                    fill="#E13B30"
                    d="m19.136 14.507-2.572-2.486c-.257-.257-.685-.257-1.028 0l-2.486 2.486c-.257.257-.257.686 0 1.029l2.486 2.486c.257.257.685.257 1.028 0l2.486-2.486a.705.705 0 0 0 .086-1.029Z"
                  />
                </svg>
              </S.NavBrand>
              <S.ModeSelection>
                <S.ModeItem
                  onClick={() => setMode("seller")}
                  $active={mode === "seller"}
                >
                  Seller
                </S.ModeItem>
                <S.ModeItem
                  onClick={() => setMode("buyer")}
                  $active={mode === "buyer"}
                >
                  Buyer
                </S.ModeItem>
              </S.ModeSelection>
            </S.NavItemGroup>
            <S.NavItemGroup>
              <ButtonBase onClick={toggleCart}>
                ตะกร้า ({cart.length})
              </ButtonBase>
            </S.NavItemGroup>
          </S.Container>
        </S.Navbar>
        <S.Content>{routes}</S.Content>
      </Router>
    </>
  );
}

export default App;
