import axios from "axios";
import { createContext, useState, useEffect } from "react";
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

        axios.defaults.headers.authorization = `Bearer ${token}`;

        axios
            .get("http://localhost:8000/api/user")
            .then((res) => {
                setUser({
                    token,
                    user: res.data.data,
                });
            })
            .catch(() => {
                localStorage.removeItem("TOKEN");
                navigate("/login");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;

    return (
        <UserStore.Provider value={[user, setUser]}>
            {children}
        </UserStore.Provider>
    );
}
