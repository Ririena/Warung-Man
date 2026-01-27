import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignupCard = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (formData.password !== formData.password_confirmation) {
            setErrors({ password_confirmation: "Password dan Konfirmasi Password tidak sesuai" });
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8000/api/register",
                formData,
            );
            navigate("/login");
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: error.response?.data?.message || "Registrasi gagal" });
            }
            console.error(error.message);
        }
    };

    return (
        <Card className="px-9 py-11 text-green-600">
            <div className="grid grid-cols-1 justify-items-center gap-2">
                <LogIn className="size-10" />

                <h1 className="text-3xl font-semibold">Sign Up</h1>
                <p className="text-center">
                    Daftar sekarang untuk mulai menggunakan semua fitur kami.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="">
                <div className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-1 gap-1">
                        <Label className="text-black font-normal">Nama</Label>
                        <Input
                            onChange={handleChange}
                            value={formData.name}
                            name="name"
                            className="border-[1.5px] bg-slate-200 rounded-sm text-black"
                            placeholder="Masukkan Nama"
                        />
                        {errors.name && <p className="text-red-600 text-[13px]">*{errors.name[0]}</p>}
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        <Label className="text-black font-normal">Email</Label>
                        <Input
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            className="border-[1.5px] bg-slate-200 rounded-sm text-black"
                            placeholder="example@company.com"
                        />
                        {errors.email && <p className="text-red-600 text-[13px]">*{errors.email[0]}</p>}
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        <Label className="text-black font-normal">
                            Password
                        </Label>
                        <Input
                            onChange={handleChange}
                            value={formData.password}
                            type="password"
                            name="password"
                            className="border-[1.5px] bg-slate-200 rounded-sm text-black"
                            placeholder="Gunakan password yang kuat"
                        />
                        {errors.password && <p className="text-red-600 text-[13px]">*{errors.password[0]}</p>}
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        <Label className="text-black font-normal">
                            Confirm Password
                        </Label>
                        <Input
                            type="password"
                            name="password_confirmation"
                            onChange={handleChange}
                            value={formData.password_confirmation}
                            className="border-[1.5px] bg-slate-200 rounded-sm text-black"
                            placeholder="Masukkan Kembali Password"
                        />
                        {errors.password_confirmation && <p className="text-red-600 text-[13px]">*{errors.password_confirmation}</p>}
                    </div>
                    <Button
                        type="submit"
                        className="cursor pointer mt-5 bg-green-600 hover:bg-green-800"
                    >
                        Register
                    </Button>
                    <p className="text-gray-400 mx-auto text-[15px]">
                        Sudah punya akun?{" "}
                        <a className="text-green-600" href="/login">
                            Log In
                        </a>
                    </p>
                </div>
            </form>
        </Card>
    );
};
