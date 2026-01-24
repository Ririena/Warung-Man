import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/ui/container";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const ProductDetail = () => {
    const [qty, setQty] = useState(1);

    return (
        <Container>
            <Card className="rounded-sm">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="w-full aspect-square bg-muted rounded-sm" />

                        {/* INFO PROUDUK */}
                        <div className="space-y-5">
                            <div>
                                <h1 className="text-2xl font-bold">
                                    Nama Produk
                                </h1>
                                <p className="text-xl font-semibold text-primary mt-1">
                                    Rp 25.000
                                </p>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Accusamus dolores possimus, at
                                corporis aut incidunt? Eveniet voluptatem
                                accusantium quas officia?
                            </p>

                            {/* Action */}
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium">
                                    Jumlah
                                </span>

                                <div className="flex items-center border rounded-sm">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() =>
                                            setQty((prev) =>
                                                prev > 1 ? prev - 1 : 1,
                                            )
                                        }
                                    >
                                        <Minus size={16} />
                                    </Button>

                                    <Input
                                        value={qty}
                                        readOnly
                                        className="w-12 text-center border-0 focus-visible:ring-0"
                                    />

                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() =>
                                            setQty((prev) => prev + 1)
                                        }
                                    >
                                        <Plus size={16} />
                                    </Button>
                                </div>
                            </div>

                            {/* ACTION */}
                            <Button size="lg" className="w-full md:w-fit">
                                Tambah ke Keranjang
                            </Button>

                            {/* INFO Kategori */}
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>
                                    Kategori:{" "}
                                    <span className="font-medium text-foreground">
                                        Makanan
                                    </span>
                                </p>
                                <p>
                                    Stok:{" "}
                                    <span className="font-medium text-foreground">
                                        Tersedia
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* DESCRIPTION */}
            <Card className="rounded-sm mt-6 p-4">
                <CardHeader>
                    <CardTitle>Deskripsi Produk</CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ut quam amet suscipit exercitationem, deserunt
                        aspernatur reiciendis. Repellendus inventore unde minima
                        voluptates qui architecto nesciunt explicabo?
                    </p>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductDetail;
