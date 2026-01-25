<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'id_cart',
        'id_product',
        'quantity',
        'price',
        'subtotal'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }
}
