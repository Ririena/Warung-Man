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
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeWithLayout />} />
                <Route path="/login" element={<Login/>} /> 
                <Route path="/signup" element={<Signup/>} /> 
            </Routes>
        </>
    );
};

export default App;
