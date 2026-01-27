<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Payment extends Model
{
    protected $table = "payments";
    protected $guarded = ["id"];
    public function transaksi():HasMany
    {
        return $this->hasMany(Transaksi::class, "id_payment");
    }
}
