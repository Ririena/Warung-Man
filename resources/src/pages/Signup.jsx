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
                        <SignupCard />
                </div>
            </div>
        </>
    );
};

const SignupCard = () => {
    return (
        <Card className="px-9 py-11 text-green-600">
            <div className="grid grid-cols-1 justify-items-center gap-2">
                <LogIn className="size-10" />

                <h1 className="text-3xl font-semibold">Sign Up</h1>
                <p className="text-center">
                    Daftar sekarang untuk mulai menggunakan semua fitur kami.
                </p>
            </div>
            <form className="">
                <div className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-1 gap-1">
                        <Label className="text-black font-normal">Nama</Label>
                        <Input
                            name="nama"
                            className="border-[1.5px] bg-slate-200 rounded-sm text-black"
                            placeholder="Masukkan Nama"
                        />
                        <ErrorAqil/>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        <Label className="text-black font-normal">Email</Label>
                        <Input
                            name="email"
                            className="border-[1.5px] bg-slate-200 rounded-sm text-black"
                            placeholder="example@company.com"
                        />
                        <ErrorEmail/>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        <Label className="text-black font-normal">
                            Password
                        </Label>
                        <Input
                            type="password"
                            name="password"
                            className="border-[1.5px] bg-slate-200 rounded-sm text-black"
                            placeholder="Gunakan password yang kuat"
                        />
                        <ErrorPassword/>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        <Label className="text-black font-normal">
                            Confirm Password
                        </Label>
                        <Input
                            type="password"
                            name="password"
                            className="border-[1.5px] bg-slate-200 rounded-sm text-black"
                            placeholder="Masukkan Kembali Password"
                        />
                        <ErrorConfirmPassword/>
                    </div>
                    <Button className="cursor pointer mt-5 bg-green-600 hover:bg-green-800">
                        Login
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

// Buat Pesan Error, pake yang dibutuhin aja cu  - Nabhan

const ErrorConfirmPassword = () => {
    return (
        <p className="text-red-600 text-[13px]">
            *Konfirmasi password tidak sesuai.
        </p>
    );
};

const ErrorEmail = () => {
    return (
        <p className="text-red-600 text-[13px]">
            *Email sudah terpakai.
        </p>
    );
};

const ErrorPassword = () => {
    return (
        <p className="text-red-600 text-[13px]">
            *Password minimal memiliki 6 karakter.
        </p>
    );
};

const ErrorAqil = () => {
    return (
        <p className="text-red-600 text-[13px]">
            *Aqil Butut.
        </p>
    );
};


export default Home;
