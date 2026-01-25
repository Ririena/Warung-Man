import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/ui/container";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "@/lib/useFetch";
import Swal from "sweetalert2";

const ProductDetail = () => {
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const [loadingCart, setLoadingCart] = useState(false);

    const { data, loading, fetchData } = useFetch(`api/products/${id}`);

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleAddToCart = async () => {
    try {
        setLoadingCart(true);

        const token = localStorage.getItem("TOKEN");
        if (!token) {
            alert("Silakan login dulu");
            return;
        }
         const confirm = await Swal.fire({
            title: 'Konfirmasi',
            html: `<div class="text-left">
                <p class="mb-2"><strong>${product.title}</strong></p>
                <p class="mb-2">Harga: <strong>Rp ${parseInt(product.price).toLocaleString('id-ID')}</strong></p>
                <p>Jumlah: <strong>${qty}</strong></p>
                <p class="mt-3 font-semibold">Total: Rp ${parseInt(product.price * qty).toLocaleString('id-ID')}</p>
            </div>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Tambahkan',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#ef4444',
        });
        if(!confirm.isConfirmed) return;

        const res = await fetch("/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                id_product: product.id,
                quantity: qty,
            }),
        });

        const text = await res.text();
        const result = JSON.parse(text);

        if (!res.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: result.message || 'Gagal tambah ke cart',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: result.message || 'Berhasil tambah ke cart',
            confirmButtonColor: '#22c55e',
        });
    } catch (error) {
        console.error(error.message);
    } finally {
        setLoadingCart(false);
    }
};


    if (loading) return <div>Loading...</div>;
    if (!data?.data) return <div>Product not found</div>;

    const product = data.data;

    return (
        <Container>
            <Card className="rounded-sm">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* IMAGE */}
                        <div className="w-full aspect-square bg-muted rounded-sm overflow-hidden">
                            <img
                                src={product.image || "/img/download.jpg"}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* INFO PRODUK */}
                        <div className="space-y-5">
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {product.title}
                                </h1>
                                <p className="text-xl font-semibold text-primary mt-1">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </p>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>

                            {/* QTY */}
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
                                                prev > 1 ? prev - 1 : 1
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

                            {/* ADD TO CART */}
                            <Button
                                size="lg"
                                className="w-full md:w-fit"
                                onClick={handleAddToCart}
                                disabled={loadingCart}
                            >
                                {loadingCart
                                    ? "Menambahkan..."
                                    : "Tambah ke Keranjang"}
                            </Button>

                            {/* INFO TAMBAHAN */}
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>
                                    Kategori:{" "}
                                    <span className="font-medium text-foreground">
                                        {product.kategori?.name}
                                    </span>
                                </p>
                                <p>
                                    Stok:{" "}
                                    <span className="font-medium text-foreground">
                                        {product.stock ?? "Tersedia"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductDetail;
