import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "@/lib/useFetch";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileSidebar from "@/components/dynamic/profile-sidebar";

import axios from "axios";
function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { transaksiId } = location.state || {};
    const [id, setId] = useState(null);
    useEffect(() => {
        if (transaksiId) {
            setId(transaksiId);
        }
    });

    const { data, loading, fetchData } = useFetch(`api/products`);

    useEffect(() => {
        if (data) {
            fetchData();
        }
    }, []);
    console.log(id);
    console.log("DATA" + data);
    async function hanndlePayment() {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/transaksi",
                { id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
                        Accept: "application/json",
                    },
                },
            );
            const data = await res.data;
            if (res.status === 200 || res.status === 201) {
                console.log("Pembayaran berhasil:", data);
                navigate("/");
            }
        } catch (error) {
            console.error("Error during payment:", error);
        }
    }
    return (
        <div>
            <Container className="">
                <div className="flex gap-3 justify-center">
                    <aside className="md:w-64 md:shrink-0">
                        <ProfileSidebar />
                    </aside>
                    <Card className="rounded-sm p-4 w-3/4 h-auto">
                        <CardHeader>
                            <CardTitle>Checkout</CardTitle>
                        </CardHeader>
                        <CardContent className="">
                            <div className="grid grid-cols-1 gap-1">
                                <div className="border-2 shadow-md flex p-2 w-full justify-between items-center">
                                    <div className="flex gap-6 items-center">
                                        <div>
                                            <img
                                                src="/img/download.jpg"
                                                className="w-24 object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h1 className="font-semibold ">
                                                Kecap Begok
                                            </h1>
                                            <h1 className="flex">
                                                <h1 className="text-xs">Rp</h1>5,000
                                            </h1>
                                            <h1 className="">
                                                3 Pcs
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="font-semibold text-gray-400">Rp15000</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Container>
            <button onClick={hanndlePayment}>bayar</button>
        </div>
    );
}
export default CheckoutPage;
