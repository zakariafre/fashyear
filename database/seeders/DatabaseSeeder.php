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
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'username' => 'admin',
            'email' => 'admin@fashyear.com',
            'password' => Hash::make('adminadmin'),
            'type' => 'admin',
        ]);

        // Create test client user
        User::create([
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'type' => 'client',
            'address' => '123 Test Street',
            'phone_number' => '1234567890',
        ]);

        // Create some initial categories
        $categories = [
            'Men',
            'Women',
            'Kids',
            'Accessories',
            'Shoes'
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }

        // Create some sample products
        $products = [
            [
                'name' => 'Classic T-Shirt',
                'description' => 'A comfortable cotton t-shirt',
                'price' => 29.99,
                'stock' => 100,
                'imgURLs' => ['tshirt1.jpg', 'tshirt2.jpg'],
                'category_id' => 1
            ],
            [
                'name' => 'Summer Dress',
                'description' => 'Light and breezy summer dress',
                'price' => 59.99,
                'stock' => 50,
                'imgURLs' => ['dress1.jpg', 'dress2.jpg'],
                'category_id' => 2
            ],
            // Add more sample products as needed
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
