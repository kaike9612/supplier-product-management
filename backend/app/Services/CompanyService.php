<?php

namespace App\Services;

use App\Models\Company;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class CompanyService
{
    /**
     * Get all companies with pagination and filters.
     */
    public function getAll(array $filters = []): LengthAwarePaginator
    {
        $query = Company::with('products');

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
     * Create a new company.
     */
    public function create(array $data): Company
    {
        return Company::create($data);
    }

    /**
     * Update an existing company.
     * If company is being deactivated, all products will be deactivated too.
     */
    public function update(Company $company, array $data): Company
    {
        return DB::transaction(function () use ($company, $data) {
            // Check if company is being deactivated
            $isBeingDeactivated = isset($data['status']) && $data['status'] === 'inactive';
            $isCurrentlyActive = $company->status === 'active';

            // Update company
            $company->update($data);

            // If company is being deactivated, deactivate all products
            if ($isBeingDeactivated && $isCurrentlyActive) {
                $company->products()->update(['status' => 'inactive']);
            }

            return $company->fresh(['products']);
        });
    }

    /**
     * Delete a company.
     * Business rule: Cannot delete if company has any products (active or inactive).
     * Returns true if deleted, false if has products.
     */
    public function delete(Company $company): array
    {
        // Check if company has any products (soft deleted included)
        $productsCount = $company->products()->withTrashed()->count();

        if ($productsCount > 0) {
            return [
                'success' => false,
                'message' => 'Não é possível excluir a empresa. Ela possui produtos vinculados.'
            ];
        }

        $company->forceDelete();

        return [
            'success' => true,
            'message' => 'Empresa excluída com sucesso.'
        ];
    }

    /**
     * Find company by ID.
     */
    public function findById(int $id): ?Company
    {
        return Company::with('products')->find($id);
    }

    /**
     * Inactivate a company.
     * When a company is inactivated, all its products are also inactivated.
     */
    public function inactivate(Company $company): Company
    {
        return DB::transaction(function () use ($company) {
            // Update company status to inactive
            $company->update(['status' => 'inactive']);

            // Inactivate all products linked to this company
            $company->products()->update(['status' => 'inactive']);

            return $company->fresh(['products']);
        });
    }
}
