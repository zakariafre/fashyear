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
        if (!$value) {
            return [];
        }

        $urls = is_array($value) ? $value : json_decode($value, true);
        if (!is_array($urls)) {
            return [];
        }

        return array_map(function ($url) {
            if (!$url) {
                return null;
            }
            
            // If it's already a full URL, return it as is
            if (filter_var($url, FILTER_VALIDATE_URL)) {
                return $url;
            }

            // If it starts with storage/, add the app URL
            if (str_starts_with($url, 'storage/')) {
                return config('app.url') . '/' . $url;
            }

            // If it's a relative path, assume it's in storage and add the full path
            return config('app.url') . '/storage/' . ltrim($url, '/');
        }, $urls);
    }

    /**
     * Set the image URLs
     */
    public function setImgURLsAttribute($value)
    {
        if (is_string($value)) {
            $value = json_decode($value, true);
        }

        if (!is_array($value)) {
            $value = [];
        }

        $this->attributes['imgURLs'] = json_encode($value);
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
