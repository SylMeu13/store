import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "@/components/DefaultLayout";
import HomePage from "@/pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AdminRoute from "./middlewares/AdminRoute";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminProductsPage from "./pages/AdminProductsPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/admin" element={<AdminLoginPage />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin/products" element={<AdminProductsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
