import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import withLayout from "./lib/withLayout";
import MainLayout from "./components/static/MainLayout";

import Product from "./pages/Product";
import Dashboard from "./pages/admin/Dashboard";
const App = () => {
    const HomeWithLayout = withLayout(Home, MainLayout);
    const ProductWithLayout = withLayout(Product, MainLayout);

    return (
        <>
            <Routes>
                <Route path="/" element={<HomeWithLayout />} />
                <Route path="/product" element={<ProductWithLayout />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
};

export default App;
