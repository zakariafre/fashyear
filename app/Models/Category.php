<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'imageUrl',
    ];

    protected $casts = [
        'id' => 'integer'
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
    
    /**
     * Get a static list of predefined categories
     * 
     * @return array
     */
    public static function getStaticCategories()
    {
        return [
            [
                'id' => 1,
                'name' => 'Hijabs',
                'description' => 'Traditional and modern hijabs in various styles, fabrics and colors.',
                'imageUrl' => 'hijab-image-url',
                'productCount' => 0
            ],
            [
                'id' => 2,
                'name' => 'Dresses',
                'description' => 'Elegant modest dresses suitable for various occasions and styles.',
                'imageUrl' => 'dress-image-url',
                'productCount' => 0
            ],
            [
                'id' => 3,
                'name' => 'Tops',
                'description' => 'Fashionable modest tops, blouses, and shirts for everyday wear.',
                'imageUrl' => 'top-image-url',
                'productCount' => 0
            ],
            [
                'id' => 4,
                'name' => 'Bottoms',
                'description' => 'Comfortable and stylish pants, skirts, and other bottom wear options.',
                'imageUrl' => 'bottom-image-url',
                'productCount' => 0
            ],
            [
                'id' => 5,
                'name' => 'Sets',
                'description' => 'Coordinated outfit sets for a complete and harmonious look.',
                'imageUrl' => 'set-image-url',
                'productCount' => 0
            ],
            [
                'id' => 6,
                'name' => 'Burkini',
                'description' => 'Modest swimwear designed for comfort and coverage while swimming.',
                'imageUrl' => 'burkini-image-url',
                'productCount' => 0
            ]
        ];
    }

    /**
     * Get all categories, either from database or static list
     */
    public static function getAllCategories()
    {
        // Always get from database first
        $categories = self::all();
        
        // Add product count to each category
        $categories->each(function ($category) {
            $category->productCount = $category->products()->count();
        });
        
        return $categories;
    }
}
