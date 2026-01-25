import { ProductsCard } from "@/features/products/ProductsCard";
import { useFetch } from "@/lib/useFetch";
import { useEffect } from "react";

const Home = () => {
    const {
        data: product,
        loading: loadingProduct,
        fetchData: fetchProduct,
    } = useFetch("/api/products");

    const {
        data: Cate,
        loading: loadingCate,
        fetchData: fetchCate,
    } = useFetch("/api/kategoris");

    useEffect(() => {
        fetchProduct();
        fetchCate();
    }, []);

    if (loadingProduct || loadingCate) {
        return <div>Loading...</div>;
    }

    return (
        <ProductsCard
            dataP={product?.data?.data ?? []}
            dataC={Cate?.data ?? []}
        />
    );
};
export default Home;
