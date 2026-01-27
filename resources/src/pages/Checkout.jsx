import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "@/lib/useFetch";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProfileSidebar from "@/components/dynamic/profile-sidebar";
import CardDetail from '../components/DetailCard.jsx';
import axios from "axios";
function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state || {};
    const [dataTransaksi, setData] = useState(null);
    useEffect(() => {
        if (data) {
            setData(data.data);
        }
    });
    // console.log("Transaksi ID:", dataTransaksi);
    async function hanndlePayment(id) {
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
    // console.log(dataTransaksi.detail_tr);
    return (
        <Container>
            <div className="flex flex-col md:flex-row gap-6">
                <aside className="md:w-[250px] md:shrink-0">
                    <ProfileSidebar />
                </aside>
                <CardDetail dataTransaksi={data} dataDetail={dataTransaksi?.detail_tr} hanndlePayment={() => hanndlePayment(dataTransaksi?.id)} />
            </div>
        </Container>
    );
}
export default CheckoutPage;
