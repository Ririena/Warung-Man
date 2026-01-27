import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/lib/useFetch";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const ProductsCard = ({ dataC, dataP }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [maxPrice, setMaxPrice] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(dataP);

    const handleNavigation = (id) => {
        navigate(`/products/${id}`);
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const applyFilter = () => {
        let filtered = dataP;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((product) =>
                selectedCategories.includes(product.category_id)
            );
        }

        // Filter by max price
        if (maxPrice) {
            filtered = filtered.filter((product) =>
                parseInt(product.price) <= parseInt(maxPrice)
            );
        }

        setFilteredProducts(filtered);
    };

    useEffect(() => {
        applyFilter();
    }, [searchTerm, selectedCategories, maxPrice]);

    const handleAddToCart = (product) => {
        // Add to cart logic here
        console.log("Added to cart:", product);
    };

    return (
        <>
            <Container>
                <div>
                    <div className="flex flex-col md:flex-row gap-6">
                        <aside className="md:w-[250px] ">
                            <Card className="rounded-sm p-4">
                                <CardHeader>
                                    <CardTitle>Filter Produk</CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Cari Produk
                                        </label>
                                        <Input
                                            placeholder="Nama produk..."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-sm font-medium">
                                            Kategori
                                        </p>
                                        {dataC.map((cate) => (
                                            <div
                                                key={cate.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={cate.id}
                                                    checked={selectedCategories.includes(
                                                        cate.id
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleCategoryChange(
                                                            cate.id
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={cate.id}
                                                    className="text-sm"
                                                >
                                                    {cate.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>



                                    <Button
                                        onClick={applyFilter}
                                        className="w-full"
                                    >
                                        Terapkan Filter
                                    </Button>
                                </CardContent>
                            </Card>
                        </aside>

                        <section className="flex-1 ">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {filteredProducts.map((item) => (
                                    <Card
                                        key={item.id}
                                        className="rounded-sm overflow-hidden flex flex-col h-full"
                                    >
                                        <div
                                            className="w-full bg-muted overflow-hidden aspect-square cursor-pointer"
                                            onClick={() => handleNavigation(item.id)}
                                        >
                                            <img
                                                src={
                                                    item.image ||
                                                    "/img/download.jpg"
                                                }
                                                alt={item.title}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform"
                                            />
                                        </div>

                                        <CardContent className="p-4 flex flex-col flex-1 gap-2">
                                            <h1>{item.title}</h1>
                                            <div className="flex items-center justify-between mb-3">
                                                <CardTitle className="flex items-center gap-1">
                                                    <span className="text-green-500">
                                                        <span className="text-sm">
                                                            Rp
                                                        </span>
                                                        {parseInt(item.price).toLocaleString(
                                                            "IDR"
                                                        )}
                                                    </span>
                                                </CardTitle>

                                                <span className="text-sm text-gray-500">
                                                    Stok {item.stock}
                                                </span>
                                            </div>

                                            <div className="flex gap-1.5 justify-center items-center">
                                                <Button
                                                    onClick={() =>
                                                        handleNavigation(item.id)
                                                    }
                                                    className="w-2/3 cursor-pointer bg-green-600 hover:bg-green-800"
                                                >
                                                    Beli
                                                </Button>
                                                <Button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="w-1/3 cursor-pointer bg-green-800 hover:bg-green-950"
                                                >
                                                    <ShoppingCart />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </Container>
        </>
    );
};
