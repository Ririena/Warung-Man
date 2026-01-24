import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserStore } from "@/context/UserContext";

const RequireAuth = () => {
    const [user] = useContext(UserStore);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default RequireAuth;
