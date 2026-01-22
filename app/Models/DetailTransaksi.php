<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DetailTransaksi extends Model
{
    protected $guarded = ["id"];
    public function transaksi():BelongsTo
    {
        return $this->belongsTo(Transaksi::class,"id_transaksi");
    }
}
