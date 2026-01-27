<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Models\DetailTransaksi;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\TransaksiResource;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;

class TransaksiController extends Controller
{
    public function confirmComplete($id)
    {
        try {
            $transaksi = Transaksi::findOrFail($id);
            if ($transaksi->status !== "dikirim") {
                return response()->json([
                    "status" => "err",
                    "msg" => "Transaksi tidak dalam status 'dikirim'"
                ], 400);
            }
            $transaksi->status = "selesai";
            $transaksi->save();
            return new TransaksiResource(true, "Berhasil mengonfirmasi transaksi selesai", $transaksi);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "err",
                "msg" => "Data tidak ditemukan"
            ], 404);
        }
    }
     public function checkout()
    {
        $user = Auth::getUser();
            DB::beginTransaction();

            try {
            $payment = Payment::create([
                "amount" => 0,
                "invoice_number" => "INV-".time(),
                "status" => "pending"
            ]);
            // 1️⃣ create transaksi
            $transaksi = Transaksi::create([
                'name' => 'TRX-' . time(),
                'totals' => 0,
                'id_user' => $user->id,
                'is_paidOrNah' => false,
                "id_payment" => $payment->id
            ]);

            $total = 0;
            $cart = Cart::where('id_user', $user->id)
                ->where('status', 'active')
                ->with('items')
                ->firstOrFail();
            // 2️⃣ pindahkan cart_items → detail_transaksis
            foreach ($cart->items as $item) {
                $total += $item->subtotal;

                DetailTransaksi::create([
                    'id_transaksi' => $transaksi->id,
                    'id_product' => $item->id_product,
                    'hargaSatuan' => $item->price,
                    'total' => $item->subtotal
                ]);
            }

            // 3️⃣ update total transaksi
            $transaksi->update([
                'totals' => $total
            ]);

            // 4️⃣ tutup cart
            $cart->delete();
            // Aqil Ganteng


            DB::commit();

            return response()->json([
                'success' => true,
                'transaksi' => $transaksi
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function index(){
        $transaksi = Transaksi::where("id_user",Auth::id())->with(['detail_tr.product','payment'])->get();
        if($transaksi->isEmpty()){
            return response()->json([
                "status" => "err",
                "msg" => "data kosong"
            ],404);
        }
        return new TransaksiResource(true,"berhasil mendapatkan data",$transaksi);
    }
    public function store(Request $request){
      return $this->paymentStatusUpdate($request);
    }
    public function createTransaksi(Request $request){
        DB::beginTransaction();
        try{
            $cart = Cart::where('id_user', Auth::user()->id)
            ->where('status', 'active')
            ->with('items')
            ->firstOrFail();
            $payment = Payment::create([
                "amount" => 0,
                "invoice_number" => "INV-".time(),
                "status" => "pending"
            ]);
            $payment->amount = $request->totals;
            $payment->save();
            $transaksi = Transaksi::create([
                "name" => Auth::user()->name . "-".time(),
                "is_paidOrNah" => false,
                "totals" => $request->totals,
                "id_user" => Auth::user()->id,
                "id_payment" => $payment->id
            ]);
            foreach($cart->items as $item){
                DetailTransaksi::create([
                    "id_transaksi" => $transaksi->id,
                    "id_product" => $item->id_product,
                    "hargaSatuan" => $item->price,
                    "quantity" => $item->quantity,
                    "total" => $item->subtotal
                ]);
            }
            $cart->delete();
            DB::commit();
            return new TransaksiResource(true,"berhasil menambahkan data",$transaksi->with(["detail_tr.product","payment"])->find($transaksi->id));
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json([
                "status" => "err",
                "msg" => $e->getMessage()
            ],500);
    }
    }
    public function showAll(){
        $transaksi = Transaksi::latest()->with(["user","payment"])->get();
        return new TransaksiResource(true,"berhasil mendapatkan data",$transaksi);
    }
    public function show(string $id){
        try{
            $transaksi = Transaksi::with("detail_tr")->where("id_user",Auth::id())->findOrFail($id);
            return new TransaksiResource(true,"berhasil mendapatkan data",$transaksi);
        }catch(\Exception $e){
            return response()->json([
                "status" => "err",
                "msg" => "data tidak ditemukan"
            ],404);
        }
    }
    public function paymentStatusUpdate(Request $request){
        DB::beginTransaction();
        // dd($request->all());
        try{
            $detail_tr  = DetailTransaksi::where("id_transaksi",$request->id)->get();
            foreach($detail_tr as $detail){
                if($detail->product->stock < $detail->quantity){
                    return response()->json([
                        "status" => "err",
                        "msg" => "stok produk ".$detail->product->title." tidak mencukupi"
                    ],400);
                }
                $product = $detail->product;
                $product->stock -= $detail->quantity;
                $product->save();

                }
                $transaksi = Transaksi::findOrFail($request->id);
                $payment = Payment::findOrFail($transaksi->id_payment);
                $payment->status = "paid";
                $payment->save();
                if($transaksi->status == "pending"){
                    $transaksi->status = "dikirim";
                    $transaksi->save();
                    }
                    DB::commit();
            return new TransaksiResource(true,"berhasil memperbarui status pembayaran",$transaksi);
        }catch(\Exception $e){
            return response()->json([
                "status" => "err",
                "msg" => "data tidak ditemukan" . $e->getMessage()
            ],404);
        }
    }
}
