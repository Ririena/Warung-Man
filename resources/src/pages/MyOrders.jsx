import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ProfileSidebar from "@/components/dynamic/profile-sidebar";
import { useState, useEffect } from "react";

const statusVariant = (status) => {
    return status === "dikirim" ? "default" : "outline";
};

const getStatusLabel = (status) => {
    return status === "dikirim" ? "Lunas" : "Belum Lunas";
};
const getStatusPengiriman = (status) => {
    return status === "dikirim" ? "Dikirim" : "Diproses";
};

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("TOKEN");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/transaksi", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Gagal mengambil data transaksi");
                }

                const data = await res.json();
                console.log(data);
                // Format data dari API ke format yang sesuai
                const formattedOrders = (data.data || []).map((order) => ({
                    id: order.id,
                    name: order.name,
                    date: new Date(order.payment.created_at).toLocaleDateString('id-ID', {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }),
                    isPaid: order.payment.status,
                    total: `Rp ${parseInt(order.payment.amount).toLocaleString("id-ID")}`,
                    status: order.status,
                }));

                setOrders(formattedOrders);
                setError(null);
            } catch (err) {
                console.error(err);
                setError(err.message);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        if (!token) {
            setError("Silakan login dulu");
            setLoading(false);
            return;
        }

        fetchOrders();
    }, [token]);
    // console.log(orders);
    return (
        <Container>
            <div className="flex flex-col md:flex-row gap-6">
                <aside className="md:w-[250px] md:shrink-0">
                    <ProfileSidebar />
                </aside>

                <section className="flex-1 space-y-4">
                    <Card className="rounded-sm p-4">
                        <h1 className="text-2xl text-foreground">
                            Pesanan Saya
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Lihat status dan detail pesanan Anda
                        </p>
                        <Separator className="mt-3" />
                    </Card>

                    {loading && (
                        <Card className="rounded-sm p-4">
                            <p className="text-center text-muted-foreground">
                                Memuat pesanan...
                            </p>
                        </Card>
                    )}

                    {error && (
                        <Card className="rounded-sm p-4 border-red-200 bg-red-50">
                            <p className="text-center text-red-600">
                                {error}
                            </p>
                        </Card>
                    )}

                    {!loading && orders.length === 0 && !error && (
                        <Card className="rounded-sm p-4">
                            <p className="text-center text-muted-foreground">
                                Belum ada pesanan 😢
                            </p>
                        </Card>
                    )}

                    {orders.map((order) => (
                        <Card
                            key={order.id}
                            className="rounded-sm p-4 hover:bg-secondary/40 transition"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Transaction ID
                                    </p>
                                    <p className="font-medium">{order.name}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Tanggal
                                    </p>
                                    <p>{order.date}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Total
                                    </p>
                                    <p className="font-medium">
                                        {order.total}
                                    </p>
                                </div>

                                <div>
                                    <Badge variant={statusVariant(order.isPaid)}>
                                        {getStatusLabel(order.isPaid)}
                                    </Badge>
                                </div>
                                <div>
                                    <Badge variant={statusVariant(order.status)}>
                                        {getStatusPengiriman(order.status)}
                                    </Badge>
                                </div>
                            </div>

                            <Separator className="my-3" />

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    ID: {order.id}
                                </span>

                                <button className="text-primary hover:underline">
                                    Lihat Detail
                                </button>
                            </div>
                        </Card>
                    ))}
                </section>
            </div>
        </Container>
    );
};

export default MyOrders;
