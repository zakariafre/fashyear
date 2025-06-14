<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AdminProductsTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_products_returns_401_without_token()
    {
        $response = $this->getJson('/api/admin/products');

        $response->assertStatus(401);
        
        // Either message is acceptable as both indicate unauthorized access
        $this->assertTrue(
            $response->json('message') === 'Unauthenticated.' || 
            $response->json('message') === 'Unauthorized. Bearer token required.',
            'Response should indicate unauthorized access'
        );
    }
} 