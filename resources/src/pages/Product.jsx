import { Card, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/lib/useFetch";
import { useEffect } from "react";
const Product = () => {
    const { data, loading, error, fetchData } = useFetch("/api/products");
    useEffect(() => {
        fetchData();
    }, []);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error loading products.</p>;
    const products = data?.data?.data || [];
    return (
        <>
            <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 md:py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <aside className="md:w-64 md:shrink-0" aria-label="Filters">
                        {/* Filter Components */}
                    </aside>
                    <section className="flex-1" aria-label="Product list">
                        <div className="grid grid-cols-3 gap-4">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <p>No products available.</p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default Product;

export const ProductCard = ({product}) => {
    return (
        <>
            <Card>
                <img
                    src={product.image || "https://placehold.co/600x400/EEE/31343C"}
                    className="object-fit"
                    width={600}
                    height={400}
                />
                <h1 className="text-xl">{product.title}</h1>
                <CardTitle>{product.price}</CardTitle>
            </Card>
        </>
    );
};
