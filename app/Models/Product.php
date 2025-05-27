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
        'stock', // its like status return true : In Stock * Or * False : Out of Stock  
        'imgURLs',
        'category_id',
    ];

    protected $casts = [
        'imgURLs' => 'array',
        'price' => 'decimal:2',
        'stock' => 'boolean',
    ];

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
