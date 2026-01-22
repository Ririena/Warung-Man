import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LogIn } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFetch } from "@/lib/useFetch";

const Home = () => {
    return (
        <>
            <div className="flex h-screen">
                <div className="w-96 m-auto">
                    <title>Login</title>
                    <LoginCard />
                </div>
            </div>
        </>
    );
};

const LoginCard = () => {
    return (
        <Card className="px-9 py-11 text-green-600">
            <div className="grid grid-cols-1 justify-items-center gap-2">
                <LogIn className="size-10" />

                <h1 className="text-3xl font-semibold">Login</h1>
                <p className="text-center">
                    Login untuk bisa menggunakan layanan kami.
                </p>
            </div>
            <form className="">
                <div className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-1 gap-1">
                        <Label className="text-black font-normal">Email</Label>
                        <Input
                            name="email"
                            className="border-[1.5px] bg-slate-200 rounded-sm text-black"
                            placeholder="example@company.com"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        <Label className="text-black font-normal">
                            Password
                        </Label>
                        <Input
                            type="password"
                            name="password"
                            className="border-[1.5px] bg-slate-200 rounded-sm text-black"
                            placeholder="Masukkan password"
                        />
                        <ErrorDataKredensial/>
                        <ErrorPassword/>
                    </div>
                    <Button className="cursor pointer mt-5 bg-green-600 hover:bg-green-800">
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

const ErrorDataKredensial = () => {
    return (
        <p className="text-red-600 text-[13px]">
            *Data kredensial yang anda masukkan tidak valid.
        </p>
    );
};

const ErrorPassword = () => {
    return (
        <p className="text-red-600 text-[13px]">
            *Password yang anda masukkan salah.
        </p>
    );
};

export default Home;
