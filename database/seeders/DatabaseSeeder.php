<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    
    //   Seed the application's database 
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'admin',
            'email' => 'admin@fashyear.com',
            'password' => Hash::make('adminadmin'),
            'type' => 'admin',
        ]);


        // Create some initial categories
        $categories = Category::getStaticCategories();
        foreach ($categories as $category) {
            Category::create([
                'id' => $category['id'],
                'name' => $category['name'],
                'description' => $category['description'],
                'imageUrl' => $category['imageUrl']
            ]);
        }

    }
}
