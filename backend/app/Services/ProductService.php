<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductService
{
    /**
     * Get all products with pagination and filters.
     */
    public function getAll(array $filters = []): LengthAwarePaginator
    {
        $query = Product::with('company');

        // Filter by company_id (optional)
        if (!empty($filters['company_id'])) {
            $query->where('company_id', $filters['company_id']);
        }

        // Filter by name
        if (!empty($filters['name'])) {
            $query->where('name', 'like', '%' . $filters['name'] . '%');
        }

        // Filter by status
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderBy('created_at', 'desc')->paginate(10);
    }

    /**
     * Create a new product.
     */
    public function create(array $data): Product
    {
        return Product::create($data);
    }

    /**
     * Update an existing product.
     */
    public function update(Product $product, array $data): Product
    {
        $product->update($data);
        return $product->fresh(['company']);
    }

    /**
     * Delete a product (physical deletion as per challenge requirements).
     */
    public function delete(Product $product): array
    {
        $product->forceDelete();

        return [
            'success' => true,
            'message' => 'Produto excluído com sucesso.'
        ];
    }

    /**
     * Inactivate a product (logical deletion).
     */
    public function inactivate(Product $product): Product
    {
        $product->update(['status' => 'inactive']);
        return $product->fresh(['company']);
    }

    /**
     * Activate a product.
     */
    public function activate(Product $product): Product
    {
        $product->update(['status' => 'active']);
        return $product->fresh(['company']);
    }

    /**
     * Toggle product status (activate/inactivate).
     */
    public function toggleStatus(Product $product): Product
    {
        $newStatus = $product->status === 'active' ? 'inactive' : 'active';
        $product->update(['status' => $newStatus]);
        return $product->fresh(['company']);
    }

    /**
     * Find product by ID.
     */
    public function findById(int $id): ?Product
    {
        return Product::with('company')->find($id);
    }
}
