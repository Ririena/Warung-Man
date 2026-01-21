import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFetch } from "@/lib/useFetch";
const Home = () => {
    const { data, loading, error, fetchData } = useFetch("api/products");

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
            <div>Home Content</div>
        </>
    );
};

export default Home;
