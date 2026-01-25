<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Models\DetailTransaksi;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\TransaksiResource;
use Illuminate\Support\Facades\Auth;

class TransaksiController extends Controller
{
     public function checkout()
    {
        $user = Auth::getUser();

        $cart = Cart::where('id_user', $user->id)
            ->where('status', 'active')
            ->with('items')
            ->firstOrFail();

        DB::beginTransaction();

        try {
            // 1️⃣ create transaksi
            $transaksi = Transaksi::create([
                'name' => 'TRX-' . time(),
                'totals' => 0,
                'id_user' => $user->id,
                'is_paidOrNah' => false
            ]);

            $total = 0;

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
        $transaksi = Transaksi::where("id_user",Auth::id())->get();
        if($transaksi->isEmpty()){
            return response()->json([
                "status" => "err",
                "msg" => "data kosong"
            ],404);
        }
        return new TransaksiResource(true,"berhasil mendapatkan data",$transaksi);
    }
    public function store(){
      return $this->checkout();
    }
    public function showAll(){
        $transaksi = Transaksi::all();
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
}
