<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class RecoverProductImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products:recover-images {--debug : Show debug information}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recover empty product images by matching them with files in storage';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting product image recovery...');

        // Get all products
        $products = Product::all();
        $this->info(sprintf('Found %d products', $products->count()));

        // Get all files in the products directory
        $files = Storage::disk('public')->files('products');
        $this->info(sprintf('Found %d files in storage', count($files)));

        $updatedCount = 0;
        $emptyCount = 0;
        $hasImagesCount = 0;

        foreach ($products as $product) {
            $currentUrls = $product->getRawOriginal('imgURLs');
            $urls = json_decode($currentUrls, true) ?? [];

            if ($this->option('debug')) {
                $this->info("\nProduct ID: {$product->id}");
                $this->info("Name: {$product->name}");
                $this->info("Current URLs: " . json_encode($urls));
            }

            // Always try to update the URLs to ensure they have the correct base URL
            $matchingFiles = array_filter($files, function($file) use ($product) {
                // Extract the UUID from the filename
                $uuid = substr(basename($file), 0, 36);
                return strpos($file, $uuid) !== false;
            });

            if (!empty($matchingFiles)) {
                $baseUrl = config('app.url');
                $newUrls = array_map(function($file) use ($baseUrl) {
                    return $baseUrl . '/storage/' . $file;
                }, array_values($matchingFiles));

                $product->imgURLs = $newUrls;
                $product->save();

                if ($this->option('debug')) {
                    $this->info("Updated URLs: " . json_encode($newUrls));
                }
                $updatedCount++;
            } else {
                if ($this->option('debug')) {
                    $this->warn("No matching files found for this product");
                }
                $emptyCount++;
            }
        }

        $this->info("\nRecovery completed:");
        $this->info("- Products updated: {$updatedCount}");
        $this->info("- Products without images: {$emptyCount}");
        $this->info("- Total products: {$products->count()}");
    }
}

