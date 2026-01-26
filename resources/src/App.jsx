import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/admin/Dashboard";
import ProductsPage from "./components/dynamic/products-page";
import CategoriesPage from "./components/dynamic/categories-page";
import TransactionsPage from "./components/dynamic/transaction-page";
import UsersPage from "./components/dynamic/users-page";

import RequireAuth from "./context/RequireAuth";
import withLayout from "./lib/withLayout";
import MainLayout from "./components/static/MainLayout";
import ProductAdd from "./features/dashboard/products/ProductAdd";
import Profile from "./pages/Profile";
import DashboardOverview from "./components/dynamic/dashboard-overview";
import MyOrders from "./pages/MyOrders";
import { CartPage } from "./pages/Cart";
import IsAdmin from "./context/IsAdmin.jsx";
import CheckoutPage from "./pages/Checkout.jsx";
// import { Link } from "react-router-dom";
const App = () => {
    const HomeWithLayout = withLayout(Home, MainLayout);
    const ProductDetailWithLayout = withLayout(ProductDetail, MainLayout);
    const ProfileWithLayout = withLayout(Profile, MainLayout);
    const OrderWithLayout = withLayout(MyOrders, MainLayout);
    const CartWithLayout = withLayout(CartPage, MainLayout);
    const ChekcoutWithLayout = withLayout(CheckoutPage, MainLayout);

    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<HomeWithLayout />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductDetailWithLayout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* USER */}
            <Route element={<RequireAuth />}>
                <Route path="/profile" element={<ProfileWithLayout />} />
                <Route path="/profile/orders" element={<OrderWithLayout />} />
                <Route path="/profile/cart" element={<CartWithLayout />} />
                <Route path="/checkout" element={<ChekcoutWithLayout />} />
            </Route>

            {/* ADMIN */}
            <Route element={<IsAdmin />}>
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<DashboardOverview />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/add" element={<ProductAdd />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="transactions" element={<TransactionsPage />} />
                    <Route path="users" element={<UsersPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
