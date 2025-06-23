<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                'key' => 'general',
                'value' => [
                    'siteName' => 'Fashyear',
                    'siteDescription' => 'Modern modest fashion for the modern woman',
                    'contactEmail' => 'contact@fashyear.com',
                    'phoneNumber' => '+212 555-123456',
                    'address' => 'Rue Mohammed V, Casablanca, Morocco',
                    'currency' => 'MAD'
                ],
                'group' => 'general'
            ],
            [
                'key' => 'payment',
                'value' => [
                    'enableCashOnDelivery' => true,
                    'enableCreditCard' => true,
                    'enablePaypal' => false,
                    'enableStripe' => true,
                    'taxRate' => 20,
                    'shipping' => [
                        'domestic' => 30,
                        'international' => 150
                    ]
                ],
                'group' => 'payment'
            ],
            [
                'key' => 'notifications',
                'value' => [
                    'orderConfirmation' => true,
                    'orderShipped' => true,
                    'orderDelivered' => true,
                    'lowStockAlert' => true,
                    'newUserRegistration' => true,
                    'marketingEmails' => false
                ],
                'group' => 'notifications'
            ]
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
} 