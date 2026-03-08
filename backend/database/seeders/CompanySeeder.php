<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = [
            [
                'name' => 'Tech Supply Brasil',
                'cnpj' => '12.345.678/0001-90',
                'email' => 'contato@techsupplybrasil.com.br',
                'phone' => '(11) 3456-7890',
                'address' => 'Av. Paulista, 1000 - São Paulo, SP',
                'status' => 'active',
            ],
            [
                'name' => 'Alfa Distribuidora',
                'cnpj' => '23.456.789/0001-01',
                'email' => 'vendas@alfadistribuidora.com.br',
                'phone' => '(21) 2345-6789',
                'address' => 'Av. Rio Branco, 50 - Rio de Janeiro, RJ',
                'status' => 'active',
            ],
            [
                'name' => 'Prime Fornecedores',
                'cnpj' => '34.567.890/0001-12',
                'email' => 'contato@primefornecedores.com.br',
                'phone' => '(31) 3456-7891',
                'address' => 'Av. Afonso Pena, 1500 - Belo Horizonte, MG',
                'status' => 'active',
            ],
            [
                'name' => 'Nova Era Comercial',
                'cnpj' => '45.678.901/0001-23',
                'email' => 'comercial@novaeracomercial.com.br',
                'phone' => '(41) 3456-7892',
                'address' => 'Av. Curitiba, 800 - Curitiba, PR',
                'status' => 'active',
            ],
            [
                'name' => 'Max Suprimentos',
                'cnpj' => '56.789.012/0001-34',
                'email' => 'vendas@maxsuprimentos.com.br',
                'phone' => '(51) 3456-7893',
                'address' => 'Av. Borges de Medeiros, 500 - Porto Alegre, RS',
                'status' => 'active',
            ],
        ];

        foreach ($companies as $company) {
            Company::create($company);
        }
    }
}
