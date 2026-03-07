<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    /**
     * List all products with pagination.
     * Optional: filter by company_id for nested routes.
     */
    public function index(\Illuminate\Http\Request $request): AnonymousResourceCollection
    {
        $products = Product::with('company');
        
        // If company_id is provided (nested route), filter by company
        if ($request->has('company_id')) {
            $products->where('company_id', $request->company_id);
        }
        
        return ProductResource::collection($products->paginate(10));

    /**
     * Show a single product.
     */
    public function show(Product $product): ProductResource
    {
        return new ProductResource($product->load('company'));
    }

    /**
     * Create a new product.
     */
    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = Product::create($request->validated());
        return (new ProductResource($product->load('company')))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Update an existing product.
     */
    public function update(UpdateProductRequest $request, Product $product): ProductResource
    {
        $product->update($request->validated());
        return new ProductResource($product->load('company'));
    }

    /**
     * Delete a product (soft delete).
     */
    public function destroy(Product $product): JsonResponse
    {
        $product->delete();
        
        return response()->json([
            'message' => 'Product deleted successfully.'
        ], 200);
    }
}
