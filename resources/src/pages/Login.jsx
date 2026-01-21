import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFetch } from "@/lib/useFetch";
const Home = () => {
    return (
        <>
            <div>
                <title>Login</title>
                <h1>Log In</h1>
                <form className="mt-5">
                    <lable>Nama</lable><br/>
                    <input className="border-2 border-slate-500 rounded-sm"/><br/>
                    <lable>Email</lable><br/>
                    <input className="border-2 border-slate-500 rounded-sm"/><br/>
                    <lable>Password</lable><br/>
                    <input className="border-2 border-slate-500 rounded-sm"/><br/>
                    <button className="cursor-pointer border-2 border-slate-500 rounded-sm mt-10">Login</button>
                </form>
            </div>
        </>
    );
};

export default Home;
