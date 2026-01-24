<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\DetailTransaksi;
use App\Models\Transaksi;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    //
     public function checkout()
    {
        $user = auth()->user();

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
            $cart->update([
                'status' => 'checked_out'
            ]);

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
}
