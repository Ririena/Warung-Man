<?php

namespace App\Http\Controllers\Api;

//import model Product
use Exception;

use App\Models\Product;
use App\Http\Controllers\Controller;
//import resource ProductResource
use App\Http\Requests\productRequest;
use App\Http\Resources\ProductResource;
use Symfony\Component\HttpFoundation\Request;

class ProductController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        //get all products
        $products = Product::latest()->paginate(20);

        //return collection of products as a resource
        return new ProductResource(true, 'List Data Products', $products);
    }

    public function store()
    {
       $validator = validator(request()->all(),[
            "image" => ["nullable"],
            "title" => ["required"],
            "description" => ["required"],
            'id_kategori' => ['required'],
            'price' => ['required'],
            "stock" => ["nullable"]
       ]);
       if($validator->fails()){
        return response([
            "status" => "gagal",
            "msg" => $validator->errors(),
        ],400);
       }
        $products = Product::create(request()->all());
        return new ProductResource(true, "product create succes", $products);
    }
    public function show(string $id){
        try{
            $product = Product::findOrFail($id);
            return new ProductResource(true,"berhasil",$product);
        }catch(Exception $e){
            return response()->json([
                "status" => "Err",
                "msg" => "data tidak ditemukan",
            ],404);
        }
    }
    public function destroy(string $id){
        try{
        $product = Product::findOrFail($id);
        $product->delete();
        return new ProductResource(true,"berhasil menghapus data",$product);
        }catch(Exception $e){
            return response()->json([
                "status" => "Err",
                "msg" => "data tidak ditemukan",
            ],404);
        }
    }
    public function update(string $id){
            $validator = validator(request()->all(),[
            "image" => ["nullable"],
            "title" => ["required"],
            "description" => ["required"],
            'id_kategori' => ['required'],
            'price' => ['required'],
            "stock" => ["nullable"]
       ]);
        if($validator->fails()){
            return response()->json([
                "status" => "err",
                "msg" => $validator->errors(),
            ],400);
            }
            try{
                $produk = Product::findOrFail($id);
                $produk->image = request()->image;
                $produk->title = request()->title;
                $produk->description = request()->description;
                $produk->id_kategori = request()->id_kategori;
                $produk->price = request()->price;
                $produk->stock = request()->stock;
                $produk->save();
                return new ProductResource(true,"berhasil mengupdate data",$produk);
            }catch(Exception $e){
                return response()->json([
                    "status" => "Err",
                    "msg" => "data tidak ditemukan",
                ],404);
            }
    }
}
