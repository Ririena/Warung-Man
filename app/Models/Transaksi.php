<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaksi extends Model
{
    protected $guarded = ["id"];
    public function detail_tr():HasMany
    {
        return $this->hasMany(DetailTransaksi::class,"id_transaksi");
    }
}
