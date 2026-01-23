import { Button } from "@/components/ui/button";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "@/lib/useFetch";
import { UserStore } from "@/context/UserContext";
import { ProductsCard } from "@/features/products/ProductsCard";
const Home = () => {
    const { data, loading, error, fetchData } = useFetch("api/products");
    const [user, setUser] = useContext(UserStore);
    console.log(user);
    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div> Error</div>;
    }

    console.log(data);
    return (
        <>
        <ProductsCard/>
        </>
    );
};

export default Home;
