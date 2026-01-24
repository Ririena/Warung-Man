import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ProfileSidebar from "@/components/dynamic/profile-sidebar";

const ORDERS = [
    {
        id: "ORD-001",
        date: "12 Jan 2026",
        status: "Selesai",
        total: "Rp 120.000",
        items: 3,
    },
    {
        id: "ORD-002",
        date: "15 Jan 2026",
        status: "Dikirim",
        total: "Rp 75.000",
        items: 2,
    },
    {
        id: "ORD-003",
        date: "ORD-003",
        date: "20 Jan 2026",
        status: "Diproses",
        total: "Rp 250.000",
        items: 5,
    },
];

const statusVariant = (status) => {
    switch (status) {
        case "Selesai":
            return "default";
        case "Dikirim":
            return "secondary";
        case "Diproses":
            return "outline";
        default:
            return "outline";
    }
};

const MyOrders = () => {
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

                    {ORDERS.map((order) => (
                        <Card
                            key={order.id}
                            className="rounded-sm p-4 hover:bg-secondary/40 transition"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Order ID
                                    </p>
                                    <p className="font-medium">{order.id}</p>
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
                                    <Badge variant={statusVariant(order.status)}>
                                        {order.status}
                                    </Badge>
                                </div>
                            </div>

                            <Separator className="my-3" />

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    {order.items} produk
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
