import axios from "axios";
let token = localStorage.getItem("TOKEN");
const api = axios.create({
    baseURL: "http://localhost:8000",

    headers: {
        "Content-Type": "application/json",

        ...token ? { Authorization: `Bearer ${token}` } : {},
    },
    withCredentials: true,
});

export default api;
