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
                'name' => 'Men',
                'description' => 'Clothing and accessories for men',
                'imageUrl' => 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
                'productCount' => 0
            ],
            [
                'id' => 2,
                'name' => 'Women',
                'description' => 'Clothing and accessories for women',
                'imageUrl' => 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
                'productCount' => 0
            ],
            [
                'id' => 3,
                'name' => 'Kids',
                'description' => 'Clothing and accessories for kids',
                'imageUrl' => 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80',
                'productCount' => 0
            ],
            [
                'id' => 4,
                'name' => 'Accessories',
                'description' => 'Fashion accessories for all',
                'imageUrl' => 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
                'productCount' => 0
            ],
            [
                'id' => 5,
                'name' => 'Footwear',
                'description' => 'Shoes and footwear',
                'imageUrl' => 'https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
                'productCount' => 0
            ]
        ];
    }
}
