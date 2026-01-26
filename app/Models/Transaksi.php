<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaksi extends Model
{
    protected $guarded = ["id"];
    public function detail_tr():HasMany
    {
        return $this->hasMany(DetailTransaksi::class,"id_transaksi");
    }
    public function user():BelongsTo
    {
        return $this->BelongsTo(User::class,"id_user");
    }
    public function payment():BelongsTo
    {
        return $this->belongsTo(Payment::class,"id_payment");
    }
}
