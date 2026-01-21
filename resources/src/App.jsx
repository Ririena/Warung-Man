import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import withLayout from "./lib/withLayout";
import MainLayout from "./components/static/MainLayout";
const App = () => {
    const HomeWithLayout = withLayout(Home, MainLayout);
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeWithLayout />} />
            </Routes>
        </>
    );
};

export default App;
