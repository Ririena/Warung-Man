import axios from "axios";
import { createContext, useState, useEffect } from "react";
import React from "react";
import { redirect, useNavigate } from "react-router-dom";

export const UserContext = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        token: null,
        user: {},
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUser() {
            try {
                const res = await axios.get();
            } catch (error) {
                setLoading(false);
                navigate("/login");
                console.error(error.message);
            }
        }
    }, []);
};
