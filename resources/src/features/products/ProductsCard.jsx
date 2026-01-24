import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";

export const ProductsCard = () => {
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

                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="makanan" />
                                        <label
                                            htmlFor="makanan"
                                            className="text-sm"
                                        >
                                            Makanan
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="minuman" />
                                        <label
                                            htmlFor="minuman"
                                            className="text-sm"
                                        >
                                            Minuman
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="snack" />
                                        <label
                                            htmlFor="snack"
                                            className="text-sm"
                                        >
                                            Snack
                                        </label>
                                    </div>
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

                    <section className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <Card
                                    key={item}
                                    className="rounded-sm overflow-hidden"
                                >
                                    <div className="aspect-square bg-muted" />

                                    <CardContent className="p-4 space-y-2">
                                        <h3 className="font-semibold text-base">
                                            Nama Produk
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Rp 25.000
                                        </p>

                                        <Button
                                            size="sm"
                                            className="w-full mt-2"
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
