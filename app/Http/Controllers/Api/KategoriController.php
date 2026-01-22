<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\KategoriResource;
use App\Models\Kategori;
use Exception;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    public function index()
    {
        return new KategoriResource(true, "berhasil", Kategori::all());
    }
    public function store(Request $request)
    {
        $validator = validator($request->all(), [
            "name" => ["string", "required"],
        ]);
        if ($validator->fails()) {
            // return new KategoriResource(false,"err " + $validator->failed(),null);
            return response()->json([
                'status' => "FAILD",
                'msg' => $validator->errors()
            ], 404);
            ;
        }
        $produk = Kategori::create($request->all());
        return new KategoriResource(true, "berhasil menambahkan data", $produk);
    }
    public function show(string $id)
    {
        try {
            $data = Kategori::findOrFail($id);
            return new KategoriResource(true, "berhasil", $data);
        } catch (Exception $e) {
            return response()->json([
                "status" => "Err",
                "msg" => "data tidak ditemukan",
            ]);
        }
    }



    public function update(Request $request, string $id)
    {
        $validator = validator($request->all(), [
            "name" => ["required", "string"],
        ]);
        if ($validator->fails()) {
            return response()->json([
                "status" => "err",
                "msg" => $validator->errors(),
            ], 400);
        }
        try {
            $data = Kategori::findOrFail($id);
            $data->name = $request->name;
            $data->save();
            return new KategoriResource(true, "berhasil", $data);
        } catch (Exception $e) {
            return response()->json([
                "status" => "Err",
                "msg" => "data tidak ditemukan",
            ],404);
        }
    }

    public function destroy(string $id)
    {
        try {
            $data = Kategori::findOrFail($id);
            $data->delete();
            return response([
                "status" => "succes",
                "msg" => "berhasil menghapus data",
            ]);
        } catch (Exception $e) {
            return response([
                "status" => "faild",
                "msg" => "data tidak ada jadi ga dihapus",
            ], 404);
        }
    }
}
