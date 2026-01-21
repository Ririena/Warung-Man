import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFetch } from "@/lib/useFetch";
const Home = () => {
    const { data, loading, error, fetchData } = useFetch("/api/products");

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data)
    return (
        <>
            <div>Home Content</div>
            <Button>Haha</Button>
        </>
    );
};

export default Home;
