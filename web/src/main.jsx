import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalStyle from "@styles/globalStyle.js";

import UserProvider from "@contexts/UserContext.jsx";
import CartProvider from "@contexts/CartContext.jsx";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />
    <SnackbarProvider maxSnack={3}>
      <Router>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </Router>
    </SnackbarProvider>
  </React.StrictMode>
);
