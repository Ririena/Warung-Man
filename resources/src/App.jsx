import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import withLayout from "./lib/withLayout";
import MainLayout from "./components/static/MainLayout";
import Test from "./pages/test";
const App = () => {
    const HomeWithLayout = withLayout(Home, MainLayout);
    const ProductWithLayout = withLayout(Test,MainLayout);
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeWithLayout />} />
                <Route path="/product" element={<ProductWithLayout />} />
            </Routes>
        </>
    );
};

export default App;
