import { Routes, Route, Navigate } from "react-router-dom";

import Products from "@features/Products/ProductsList";
import AddProduct from "@features/Products/AddProduct";
import ProductDetails from "@features/Products/ProductDetails";

import Navbar from "@components/ui/Navbar";
import Content from "@components/ui/Content";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Content>{routes}</Content>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
