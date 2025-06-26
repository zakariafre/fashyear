<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Product;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $products = Product::all();

        foreach ($products as $product) {
            $imgURLs = $product->getRawOriginal('imgURLs');
            if (!$imgURLs) continue;

            $urls = json_decode($imgURLs, true);
            if (!is_array($urls)) continue;

            // Update each URL to be a full URL
            $updatedUrls = array_map(function ($url) {
                if (!$url) return null;
                
                // If it's already a full URL, keep it as is
                if (filter_var($url, FILTER_VALIDATE_URL)) {
                    return $url;
                }
                
                // Clean up the URL
                $url = str_replace('\\', '/', $url);
                $url = ltrim($url, '/');
                $url = str_replace(['storage/', 'public/'], '', $url);
                
                // If it's just a filename, assume it's in the products directory
                if (!str_contains($url, '/')) {
                    $url = 'products/' . $url;
                }
                
                // Return the full URL
                return asset('storage/' . $url);
            }, $urls);

            // Update the product with the new URLs
            $product->imgURLs = array_filter($updatedUrls);
            $product->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No need for down migration as we're just updating URLs to their full form
    }
};
