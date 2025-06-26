<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class FixProductImageUrls extends Command
{
    protected $signature = 'products:clear-images';
    protected $description = 'Clear all product image URLs to prepare for re-upload';

    public function handle()
    {
        $this->info('Starting to clear product image URLs...');

        $products = Product::all();
        $count = 0;

        foreach ($products as $product) {
            $product->imgURLs = [];
            $product->save();
            $count++;
        }

        $this->info("Successfully cleared image URLs for {$count} products.");
    }
} 