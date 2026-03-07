<?php

use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Companies routes
Route::apiResource('companies', CompanyController::class)->parameters([
    'companies' => 'id'
]);

// Products routes
Route::apiResource('products', ProductController::class)->parameters([
    'products' => 'id'
]);

// Custom route to inactivate a product
Route::patch('products/{id}/inactivate', [ProductController::class, 'inactivate']);

// Nested routes - Products for a Company
Route::get('companies/{id}/products', [ProductController::class, 'index']);
Route::post('companies/{id}/products', [ProductController::class, 'store']);
