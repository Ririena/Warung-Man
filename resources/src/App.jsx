import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tes from "./pages/Tes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import withLayout from "./lib/withLayout";
import MainLayout from "./components/static/MainLayout";

import Product from "./pages/Product";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import RequireAuth from "./context/RequireAuth";
import ProductDetail from "./pages/ProductDetail";
const App = () => {
    const HomeWithLayout = withLayout(Home, MainLayout);
    const ProfileWithLayout = withLayout(Profile, MainLayout);
    const OrderWithLayout = withLayout(MyOrders, MainLayout);
    const ProductDetailLayout = withLayout(ProductDetail, MainLayout);
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeWithLayout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Product />} />
                <Route path="/products/:id" element={<ProductDetailLayout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />

                <Route element={<RequireAuth />}>
                    <Route path="/profile" element={<ProfileWithLayout />} />
                    <Route
                        path="/profile/orders"
                        element={<OrderWithLayout />}
                    />
                </Route>
            </Routes>
        </>
    );
};

export default App;
