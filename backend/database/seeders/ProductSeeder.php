<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = Company::all();

        $products = [
            [
                'name' => 'Notebook Dell Inspiron',
                'sku' => 'NOTE-DELL-001',
                'price' => 3499.90,
                'status' => 'active',
            ],
            [
                'name' => 'Mouse Logitech',
                'sku' => 'MOUSE-LOGI-001',
                'price' => 89.90,
                'status' => 'active',
            ],
            [
                'name' => 'Teclado Mecânico',
                'sku' => 'TECLADO-MEC-001',
                'price' => 299.90,
                'status' => 'active',
            ],
            [
                'name' => 'Monitor 24 Polegadas',
                'sku' => 'MON-24-001',
                'price' => 899.90,
                'status' => 'active',
            ],
            [
                'name' => 'Headset USB',
                'sku' => 'HEAD-USB-001',
                'price' => 159.90,
                'status' => 'active',
            ],
            [
                'name' => 'Impressora HP Laser',
                'sku' => 'IMP-HP-LAS-001',
                'price' => 1299.90,
                'status' => 'active',
            ],
        ];

        foreach ($companies as $company) {
            foreach ($products as $product) {
                Product::create([
                    'name' => $product['name'],
                    'sku' => $product['sku'] . '-' . str_pad($company->id, 3, '0', STR_PAD_LEFT),
                    'price' => $product['price'],
                    'status' => $product['status'],
                    'company_id' => $company->id,
                ]);
            }
        }
    }
}
