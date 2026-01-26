import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const {transaksiId} = location.state || {};
    const [id,setId] = useState(null);
    useEffect(() => {
        if(transaksiId){
            setId(transaksiId);
        }
    });
    // console.log("Transaksi ID:", id);
    async function hanndlePayment(){
        try{
        const res = await axios.post("http://localhost:8000/api/transaksi",{id},{headers:{
                Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
                Accept: "application/json",
            }});
        const data = await res.data;
        if(res.status === 200 || res.status ===201){
            console.log("Pembayaran berhasil:", data);
            navigate("/");
        }
    }catch(error){
        console.error("Error during payment:", error);
    }
    }
    return <div>Checkout Page <br />
        <button onClick={hanndlePayment}>bayar</button>
    </div>;
}
export default CheckoutPage;
