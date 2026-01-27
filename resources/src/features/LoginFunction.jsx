import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserStore } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

export const LoginCard = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserStore);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(
                "http://localhost:8000/api/login",
                formData,
            );

            const { token, user } = res.data;

            localStorage.setItem("TOKEN", token);
            axios.defaults.headers.authorization = `Bearer ${token}`;

            setUser({
                token,
                user,
            });
            if(user.role == "admin"){
                navigate("/dashboard");
                return;
            }else if(user.role == "user"){
                navigate("/");
                return;
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login gagal. Silakan coba lagi.");
            console.error(error.response?.data || error.message);
        }
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Card className="px-9 py-11 text-green-600">
            <div className="grid grid-cols-1 justify-items-center gap-2">
                <LogIn className="size-10" />

                <h1 className="text-3xl font-semibold">Login</h1>
                <p className="text-center">
                    Login untuk bisa menggunakan layanan kami.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="">
                <div className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-1 gap-1">
                        <Label className="text-black font-normal">Email</Label>
                        <Input
                            onChange={onChange}
                            name="email"
                            value={formData.email}
                            className="border-[1.5px] bg-slate-200 rounded-sm text-black"
                            placeholder="example@company.com"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        <Label className="text-black font-normal">
                            Password
                        </Label>
                        <Input
                            onChange={onChange}
                            value={formData.password}
                            type="password"
                            name="password"
                            className="border-[1.5px] bg-slate-200 rounded-sm text-black"
                            placeholder="Masukkan password"
                        />
                        {error && <p className="text-red-600 text-[13px]">*{error}</p>}
                    </div>
                    <Button
                        type="submit"
                        className="cursor pointer mt-5 bg-green-600 hover:bg-green-800"
                    >
                        Login
                    </Button>
                    <p className="text-gray-400 mx-auto text-[15px]">
                        Belum punya akun?{" "}
                        <a className="text-green-600" href="/signup">
                            Sign Up
                        </a>
                    </p>
                </div>
            </form>
        </Card>
    );
};
