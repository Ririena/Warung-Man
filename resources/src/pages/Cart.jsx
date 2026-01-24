import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/ui/container";
import { Minus, Plus, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import ProfileSidebar from "@/components/dynamic/profile-sidebar";

export const CartPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updatingItem, setUpdatingItem] = useState(null);

    const token = localStorage.getItem("TOKEN");

    const fetchCart = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            const data = await res.json();
            if (res.ok) {
                setCart(data.cart);
            } else {
                alert(data.message || "Gagal mengambil cart");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            alert("Silakan login dulu");
            return;
        }
        fetchCart();
    }, []);

    const updateQuantity = async (itemId, qty) => {
        if (qty < 1) return;
        setUpdatingItem(itemId);
        try {
            const res = await fetch(`/api/cart-item/${itemId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: qty }),
            });
            const data = await res.json();
            if (res.ok) {
                fetchCart();
            } else {
                alert(data.message || "Gagal update quantity");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setUpdatingItem(null);
        }
    };

    const removeItem = async (itemId) => {
        if (!confirm("Hapus item dari cart?")) return;
        setUpdatingItem(itemId);
        try {
            const res = await fetch(`/api/cart-item/${itemId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            const data = await res.json();
            if (res.ok) {
                fetchCart();
            } else {
                alert(data.message || "Gagal hapus item");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setUpdatingItem(null);
        }
    };

    if (loading) return <div>Loading cart...</div>;
    if (!cart || !cart.items || cart.items.length === 0)
        return <div>Keranjangmu kosong 😢</div>;

    const total = cart.items.reduce((sum, i) => sum + i.subtotal, 0);

    return (
        <Container>
            <aside>
                <ProfileSidebar />
            </aside>
            <Card className="rounded-sm p-4 mt-8">
                <CardHeader>
                    <CardTitle>Keranjang Belanja</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {cart.items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border-b pb-4"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={
                                        item.product.image
                                            ? `/storage/${item.product.image}`
                                            : "/img/download.jpg"
                                    }
                                    alt={item.product.title}
                                    className="w-16 h-16 object-cover rounded-sm"
                                />
                                <div>
                                    <p className="font-semibold">
                                        {item.product.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Rp {item.price} x {item.quantity} = Rp{" "}
                                        {item.subtotal}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity - 1,
                                        )
                                    }
                                    disabled={updatingItem === item.id}
                                >
                                    <Minus size={16} />
                                </Button>
                                <Input
                                    value={item.quantity}
                                    readOnly
                                    className="w-12 text-center border-0 focus-visible:ring-0"
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity + 1,
                                        )
                                    }
                                    disabled={updatingItem === item.id}
                                >
                                    <Plus size={16} />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    onClick={() => removeItem(item.id)}
                                    disabled={updatingItem === item.id}
                                >
                                    <Trash size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between font-bold text-lg mt-4">
                        <span>Total:</span>
                        <span>Rp {total}</span>
                    </div>

                    <Button className="w-full mt-4" disabled={loading}>
                        Checkout
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};
