<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kategori extends Model
{
    protected $guarded = ["id"];
    public function products():HasMany
    {
        return $this->hasMany(Kategori::class,"id_kategori");
    }
}
