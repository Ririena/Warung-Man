import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function CardDetail({ dataTransaksi, hanndlePayment, dataDetail }) {
  const [transaksi, setTransaksi] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [dataTransaksiState, setDataTransaksiState] = useState([]);
  useEffect(() => {
    if (dataTransaksi) {
        setDataTransaksiState(dataTransaksi);
        }
  })
    console.log("data detail:", dataTransaksi.data);
  useEffect(() => {
    if (dataDetail) {
      setTransaksi(dataDetail);
      const total = dataDetail.reduce(
        (sum, item) => sum + parseInt(item.total),
        0
      );
      setTotalPayment(total);
    }
  }, [dataDetail]);

  return (
    <Card className="rounded-lg w-full flex flex-col shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardTitle className="text-lg font-bold text-gray-800">
          Ringkasan Checkout
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 py-4">
        {transaksi.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-3 flex gap-4">
              <img
                src={
                  item.product.image
                    ? `/storage/${item.product.image}`
                    : "/img/download.jpg"
                }
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Jumlah produk: {item.quantity}
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-green-600 font-bold text-sm">
                    Rp{" "}
                    {parseInt(item.product.price).toLocaleString("id-ID")}
                  </span>
                  <a
                    href="#"
                    className="text-blue-500 hover:text-blue-700 text-xs"
                  >
                    Detail →
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-between border-t px-3 py-2 bg-gray-50 text-sm">
              <span className="text-gray-600">
                Subtotal ({item.quantity} produk)
              </span>
              <span className="font-semibold text-gray-800">
                Rp {parseInt(item.total).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
      <div className="border-t bg-gradient-to-r from-gray-50 to-gray-100 p-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-600">Total Pembayaran</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <p className="text-2xl font-bold text-gray-900">
            Rp {totalPayment.toLocaleString("id-ID")}
          </p>
          {dataTransaksi.data.payment.status !== "paid" && (
          <Button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold w-32 rounded-lg transition-colors"
            onClick={hanndlePayment}
          >
            Bayar
          </Button>
            )}
            {dataTransaksi.data.payment.status === "paid" && (
                <>
            <div className="text-green-600 font-semibold">
            Pembayaran Selesai
          </div>
            <div className="text-green-600 font-semibold">
             barang {dataTransaksi.data.status === "dikirim" ? "belum dikirim" : "dikirim"} ke alamat Anda
          </div>
              </>
            )}

        </div>
      </div>
    </Card>
  );
}

export default CardDetail;
