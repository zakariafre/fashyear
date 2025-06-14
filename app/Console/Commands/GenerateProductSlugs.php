<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;

class GenerateProductSlugs extends Command
{
    protected $signature = 'products:generate-slugs';
    protected $description = 'Generate slugs for all existing products';

    public function handle()
    {
        $products = Product::all();
        $count = 0;

        foreach ($products as $product) {
            if (empty($product->slug)) {
                $product->slug = Product::generateUniqueSlug($product->name);
                $product->save();
                $count++;
            }
        }

        $this->info("Generated slugs for {$count} products.");
    }
} 