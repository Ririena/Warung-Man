import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserStore = createContext(null);

export default function UserContext({ children }) {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("TOKEN");

        if (!token) {
            setLoading(false);
            return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        axios
            .get("http://localhost:8000/api/user")
            .then((res) => {
                // 🔥 API kamu return user langsung
                setUser({
                    token,
                    user: res.data, // ✅ PENTING
                });
            })
            .catch(() => {
                localStorage.removeItem("TOKEN");
                setUser(null);
                navigate("/login");
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    // ⏳ Block render sebelum auth siap
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Checking authentication...
            </div>
        );
    }

    return (
        <UserStore.Provider value={{ user, setUser }}>
            {children}
        </UserStore.Provider>
    );
}
