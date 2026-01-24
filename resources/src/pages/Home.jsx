import { Button } from "@/components/ui/button";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "@/lib/useFetch";
import { UserStore } from "@/context/UserContext";
import { ProductsCard } from "@/features/products/ProductsCard";
const Home = () => {
    const { data:product, loading:loadingProduct, error:errProduct, fetchData:fetchProduct } = useFetch("api/products");
    const { data:Cate, loading:loadingCate, error:errCate, fetchData:fetchCate } = useFetch("api/kategoris");
    const [user, setUser] = useContext(UserStore);
    console.log(user);
    useEffect(() => {
        fetchProduct();
        fetchCate();
    }, []);

    if (loadingProduct||loadingCate) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <ProductsCard dataP={product.data.data} dataC={Cate.data} />
        </>
    );
};

export default Home;
