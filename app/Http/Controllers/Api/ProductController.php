<?php

namespace App\Http\Controllers\Api;

//import model Product
use App\Models\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\productRequest;
//import resource ProductResource
use App\Http\Resources\ProductResource;

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
        $products = Product::latest()->paginate(5);

        //return collection of products as a resource
        return new ProductResource(true, 'List Data Products', $products);
    }

    public function store(productRequest $request)
    {
        $request->validate();
        $products = Product::create($request->all());
        return new ProductResource(true, "product create succes", $products);
    }
}
