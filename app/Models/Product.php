<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    // Allow these fields to be mass-assigned
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'imgURLs',
        'category_id',
        'size',
        'colors',
        'slug',
    ];

    protected $casts = [
        'imgURLs' => 'array',
        'price' => 'decimal:2',
        'stock' => 'boolean',
        'size' => 'array',
        'colors' => 'array',
    ];

    /**
     * Get the image URLs with full paths.
     */
    protected function getImgURLsAttribute($value)
    {
        \Log::info('Raw database value for imgURLs:', ['value' => $value]);

        if (!$value) {
            return [];
        }

        // If the value is already an array, use it directly
        $urls = is_array($value) ? $value : json_decode($value, true);
        
        if (!is_array($urls)) {
            return [];
        }

        return array_map(function ($url) {
            if (!$url) return null;
            
            // Return URLs as is since they're now stored as full URLs
            return $url;
        }, $urls);
    }

    /**
     * Set the image URLs
     */
    protected function setImgURLsAttribute($value)
    {
        if (is_string($value)) {
            $value = json_decode($value, true);
        }

        if (!is_array($value)) {
            $value = [];
        }

        // Clean up URLs before storing
        $value = array_map(function ($url) {
            if (!$url) return null;
            
            // If it's a full URL, store it as is
            if (filter_var($url, FILTER_VALIDATE_URL)) {
                return $url;
            }
            
            // For relative paths, ensure clean format and convert to full URL
            $url = str_replace('\\', '/', $url); // Convert backslashes to forward slashes
            $url = ltrim($url, '/'); // Remove leading slashes
            $url = str_replace(['storage/', 'public/'], '', $url); // Remove storage/ or public/ prefixes
            
            // If it's just a filename, assume it's in the products directory
            if (!str_contains($url, '/')) {
                $url = 'products/' . $url;
            }
            
            // Return the full URL using asset helper
            return asset('storage/' . $url);
        }, $value);

        // Store as a JSON array without escaped slashes
        $this->attributes['imgURLs'] = json_encode(array_filter($value), JSON_UNESCAPED_SLASHES);
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            $product->slug = static::generateUniqueSlug($product->name);
        });

        static::updating(function ($product) {
            if ($product->isDirty('name')) {
                $product->slug = static::generateUniqueSlug($product->name);
            }
        });
    }

    /**
     * Generate a unique slug from the product name.
     */
    protected static function generateUniqueSlug($name)
    {
        $baseSlug = str_replace(' ', '-', strtolower($name));
        $baseSlug = preg_replace('/[^a-z0-9-]/', '', $baseSlug);
        
        $slug = $baseSlug;
        $counter = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    // Relationship: Product belongs to a Category
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function wishlistItems(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }
}
