<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {}

    /**
     * List all products with pagination and filters.
     */
    public function index(\Illuminate\Http\Request $request): AnonymousResourceCollection
    {
        $filters = $request->only(['company_id', 'name', 'status']);
        $products = $this->productService->getAll($filters);
        return ProductResource::collection($products);
    }

    /**
     * Show a single product.
     */
    public function show(int $id): JsonResponse|ProductResource
    {
        $product = $this->productService->findById($id);
        
        if (!$product) {
            return response()->json([
                'message' => 'Produto não encontrado.'
            ], 404);
        }

        return new ProductResource($product);
    }

    /**
     * Create a new product.
     */
    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = $this->productService->create($request->validated());
        return (new ProductResource($product->load('company')))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Update an existing product.
     */
    public function update(UpdateProductRequest $request, int $id): JsonResponse|ProductResource
    {
        $product = $this->productService->findById($id);
        
        if (!$product) {
            return response()->json([
                'message' => 'Produto não encontrado.'
            ], 404);
        }

        $product = $this->productService->update($product, $request->validated());
        return new ProductResource($product);
    }

    /**
     * Delete a product (physical deletion).
     */
    public function destroy(int $id): JsonResponse
    {
        $product = $this->productService->findById($id);
        
        if (!$product) {
            return response()->json([
                'message' => 'Produto não encontrado.'
            ], 404);
        }

        $result = $this->productService->delete($product);

        return response()->json([
            'message' => $result['message']
        ], 200);
    }

    /**
     * Inactivate a product (logical deletion).
     */
    public function inactivate(int $id): JsonResponse
    {
        $product = $this->productService->findById($id);
        
        if (!$product) {
            return response()->json([
                'message' => 'Produto não encontrado.'
            ], 404);
        }

        $product = $this->productService->inactivate($product);
        
        return response()->json([
            'message' => 'Produto inativado com sucesso.'
        ], 200);
    }
}
