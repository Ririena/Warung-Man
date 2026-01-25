import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/lib/useFetch";
import { useNavigate } from "react-router-dom";

export const ProductsCard = ({ dataC, dataP }) => {
    const navigate = useNavigate();

    const handleNavigation = (id) => {
        navigate(`/products/${id}`);
    };
    console.log(dataC, dataP);
    return (
        <>
            <Container>
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
                                    <Input placeholder="Nama produk..." />
                                </div>

                                <div className="space-y-3">
                                    <p className="text-sm font-medium">
                                        Kategori
                                    </p>
                                    {dataC.map((cate) => (
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id={cate.id} />
                                            <label
                                                htmlFor={cate.id}
                                                className="text-sm"
                                            >
                                                {cate.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Harga Maksimal
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="Rp 50.000"
                                    />
                                </div>

                                <Button className="w-full">
                                    Terapkan Filter
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>

                    <section className="flex-1 ">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dataP.map((item) => (
                                <Card
                                    onClick={() => handleNavigation(item.id)}
                                    key={item.id}
                                    className="rounded-sm overflow-hidden flex flex-col h-full"
                                >
                                    <div className="w-full h-[350px] bg-muted overflow-hidden">
                                        <img
                                            src={
                                                item.image ||
                                                "/img/download.jpg"
                                            }
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <CardContent className="p-4 flex flex-col flex-1 gap-2">
                                        <div className="">
                                            <h3 className="font-semibold text-base line-clamp-2">
                                                {item.title}
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                Rp {item.price}
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                {item.kategori.name}
                                            </p>
                                        </div>

                                        <Button
                                            size="sm"
                                            className="w-full mt-auto"
                                        >
                                            Tambah ke Keranjang
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </Container>
        </>
    );
};
