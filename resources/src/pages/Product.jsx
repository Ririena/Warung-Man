import { Card, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/lib/useFetch";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Product = () => {
    const { data, loading, error, fetchData } = useFetch("/api/products");
    useEffect(() => {
        fetchData();
    }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products.</p>;
    const products = data?.data?.data || [];

    return (
        <>
            <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 md:py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <aside
                        className="md:w-64 md:shrink-0"
                        aria-label="Filters"
                    >
                        <div className="fixed grud-cols-1 gap-10">
                            <h1 className="text-2xl mb-3" >List Kategori</h1>
                            <h1 className="text-xl text-gray-500">Kategori</h1>
                            <h1 className="text-xl text-gray-500">Kategori</h1>
                            <h1 className="text-xl text-gray-500">Kategori</h1>
                            <h1 className="text-xl text-gray-500">Kategori</h1>
                        </div>
                    </aside>
                    <section className="flex-1" aria-label="Product list">
                        <div className="grid grid-cols-5 gap-4">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
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

export const ProductCard = ({ product }) => {
    return (
        <>
            <Card>
                <div className="aspect-square w-full overflow-hidden rounded-t-lg">
                    <img
                        src={
                            product.image ||
                            "https://placehold.co/500x1000/EEE/31343C"
                        }
                        className="w-full h-full object-cover"
                        width={1000}
                        height={1000}
                    />
                </div>
                <div className="p-3 grid grid-cols-1 gap-1">
                    <h1>{product.title}</h1>
                    <div className="flex items-center justify-between mb-3">
                        <CardTitle className="flex items-center gap-1">
                            <span className="text-green-500">
                                <span className="text-sm">Rp</span>
                                {product.price}
                            </span>
                        </CardTitle>

                        <span className="text-sm text-gray-500">
                            Stok {product.stock}
                        </span>
                    </div>

                    <div className="flex gap-1.5 justify-center items-center">
                        <Button className="w-2/3 cursor-pointer bg-green-600 hover:bg-green-800">
                            Beli
                        </Button>
                        <Button className="w-1/3 cursor-pointer bg-green-800 hover:bg-green-950">
                            <ShoppingCart />
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    );
};

export const Categories = ({ product }) => {
    return (
        <>
            <Card>
                <img
                    src={
                        product.image ||
                        "https://placehold.co/1000x1000/EEE/31343C"
                    }
                    className="object-fit"
                    width={1000}
                    height={1000}
                />
                <div className="p-3 grid grid-cols-1 gap-1">
                    <h1>{product.title}</h1>
                    <div className="flex items-center justify-between mb-3">
                        <CardTitle className="flex items-center gap-1">
                            <span className="text-green-500">
                                <span className="text-sm">Rp</span>
                                {product.price}
                            </span>
                        </CardTitle>

                        <span className="text-sm text-gray-500">
                            Stok {product.stock}
                        </span>
                    </div>

                    <div className="flex gap-1.5 justify-center items-center">
                        <Button className="w-2/3 cursor-pointer bg-green-600 hover:bg-green-800">
                            Beli
                        </Button>
                        <Button className="w-1/3 cursor-pointer bg-green-800 hover:bg-green-950">
                            <ShoppingCart />
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    );
};
