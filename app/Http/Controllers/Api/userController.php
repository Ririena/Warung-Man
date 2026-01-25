<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UsersResource;
use App\Models\User;
use Illuminate\Http\Request;

class userController extends Controller
{
    public function index(){
        $user = User::all();
        return new UsersResource(true,"berhasil menampilkan data",$user);
    }
}
