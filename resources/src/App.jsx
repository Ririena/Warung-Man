import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tes from "./pages/Tes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import withLayout from "./lib/withLayout";
import MainLayout from "./components/static/MainLayout";
import Product from "./pages/Product";
import Dashboard from "./pages/admin/Dashboard";

const App = () => {
    const HomeWithLayout = withLayout(Home, MainLayout);
    const ProductWithLayout = withLayout (Product, MainLayout);
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeWithLayout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<ProductWithLayout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
            </Routes>
        </>
    );
};

export default App;
