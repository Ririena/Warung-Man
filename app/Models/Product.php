<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    /**
     * fillable
     *
     * @var array
     */
    protected $guarded = ['id'];
    public function kategori():BelongsTo
    {
        return $this->belongsTo(Kategori::class,"id_kategori");
    }
    public function transaksi():BelongsTo
    {
        return $this->belongsTo(Transaksi::class,"id_");
    }
}
