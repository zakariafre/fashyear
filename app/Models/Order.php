<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'guest_email',
        'total_price',
        'status',
        'shipping_address',
        'payment_method',
        'payment_status',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'shipping_address' => 'array',
        'total_price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // When the order is retrieved, calculate the total from items only if needed
        static::retrieved(function ($order) {
            if ((!$order->total_price || $order->total_price == 0) && $order->relationLoaded('orderItems')) {
                $total = $order->orderItems->sum(function ($item) {
                    return floatval($item->price) * intval($item->quantity);
                });
                if ($total > 0) {
                    $order->total_price = $total;
                    $order->saveQuietly(); // Use saveQuietly to prevent triggering events
                }
            }
        });
    }

    /**
     * Get the total attribute.
     * 
     * @param mixed $value
     * @return float
     */
    public function getTotalAttribute()
    {
        return floatval($this->total_price);
    }

    /**
     * Get the user that owns the order
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the order items for this order
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Alias for orderItems to maintain backward compatibility
     */
    public function items(): HasMany
    {
        return $this->orderItems();
    }

    /**
     * Get the invoice for this order
     */
    public function invoice(): HasOne
    {
        return $this->hasOne(Invoice::class);
    }       
}
