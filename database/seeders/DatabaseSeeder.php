<?php

namespace Database\Seeders;

use App\Models\Kategori;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::create([
            "name" => "Admin",
            "email" => "admin@example.com",
            "password" => bcrypt("password"),
            "role" => "admin",
            "alamat" => "Jl. Admin No.1"
        ]);
        // $roles = ['admin','karyawan','pelanggan'];
        // foreach($roles as $role){
        //     Role::create([
        //         "name" => $role,
        //     ]);
        // }
        Kategori::create([
        "name" => "test"
        ]);
        Product::create([
            "title" => "Product Test",
            "description" => "This is a test product",
            "price" => 10000,
            "stock" => 50,
            "id_kategori" => 1
        ]);
        Product::create([
            "title" => "Product Test2",
            "description" => "This is a test product2",
            "price" => 10000,
            "stock" => 50,
            "id_kategori" => 1
        ]);

    }
}
