import { Navigate, Outlet } from "react-router-dom";
import { UserStore } from "@/context/UserContext";
import { useContext } from "react";
const IsAdmin = () => {
    const token = localStorage.getItem("TOKEN");
    const { user } = useContext(UserStore);
    console.log(user.user.role);
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    if (user.user.role != "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default IsAdmin;
