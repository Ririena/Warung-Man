<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $user = auth()->guard('api')->user(); // 🔑 JWT

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $cart = Cart::where('id_user', $user->id)
            ->where('status', 'active')
            ->with('items.product')
            ->first();

        return response()->json([
            'success' => true,
            'cart' => $cart
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_product' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $user = auth()->guard('api')->user(); // 🔑 JWT

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $cart = Cart::firstOrCreate([
            'id_user' => $user->id,
            'status' => 'active'
        ]);

        $product = Product::findOrFail($request->id_product);

        $item = CartItem::where('id_cart', $cart->id)
            ->where('id_product', $product->id)
            ->first();

        if ($item) {
            $item->quantity += $request->quantity;
            $item->subtotal = $item->quantity * $item->price;
            $item->save();
        } else {
            CartItem::create([
                'id_cart' => $cart->id,
                'id_product' => $product->id,
                'quantity' => $request->quantity,
                'price' => $product->price,
                'subtotal' => $product->price * $request->quantity
            ]);
        }

        return response()->json([
            'success' => true,
            'cart' => $cart->load('items.product')
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = auth()->guard('api')->user(); // 🔑 JWT

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $item = CartItem::find($id);

        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Item tidak ditemukan'
            ], 404);
        }

        $cart = Cart::find($item->id_cart);


        $item->quantity = $request->quantity;
        $item->subtotal = $item->quantity * $item->price;
        $item->save();

        return response()->json([
            'success' => true,
            'cart' => $cart->load('items.product')
        ]);
    }


    public function destroy($id)
    {
        $user = auth()->guard('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $item = CartItem::findOrFail($id);



        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item removed from cart'
        ]);
    }
}
