<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends User
{
    protected $fillable = [
        'username',
        'email',
        'password',
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($admin) {
            $admin->type = 'admin';
        });
    }
}
