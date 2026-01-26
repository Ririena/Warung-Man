<?php

use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\KategoriController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\UpdateController;
use App\Http\Controllers\Api\userController;
use App\Http\Controllers\Api\TransaksiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products-public', [ProductController::class, 'indexPublic']);
Route::get('/kategoris-public', [KategoriController::class, 'indexPublic']);
Route::middleware('auth:api')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::delete('/cart-item/{id}', [CartController::class, 'destroy']);
    Route::put('/cart-item/{id}', [CartController::class, 'update']);
    Route::apiResource("/transaksi",TransaksiController::class);
    });
    Route::middleware(['auth:api'])->group(function(){
    Route::apiResource('/products', ProductController::class);
    Route::get('/transaksi-all', [TransaksiController::class, 'showAll']);
    Route::apiResource('/kategoris', KategoriController::class);
    Route::apiResource('/users', userController::class);
    // Route::get('/transaksi-all', [TransaksiController::class, 'showAll']);
    Route::post('/createTransaksi', [TransaksiController::class, 'createTransaksi']);
    });

// Route::get("/users",[userController::class, "index"])->name("user.index");
Route::post('/register', RegisterController::class)->name('register');
Route::post('/login', LoginController::class)->name('login');
Route::post('/logout', LogoutController::class)->name('logout');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:api')->group(function () {
    Route::put('/update', UpdateController::class)->name('update');
});

