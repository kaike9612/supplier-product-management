<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CompanyController extends Controller
{
    /**
     * List all companies with pagination.
     */
    public function index(): AnonymousResourceCollection
    {
        $companies = Company::with('products')->paginate(10);
        return CompanyResource::collection($companies);
    }

    /**
     * Show a single company.
     */
    public function show(Company $company): CompanyResource
    {
        return new CompanyResource($company->load('products'));
    }

    /**
     * Create a new company.
     */
    public function store(StoreCompanyRequest $request): JsonResponse
    {
        $company = Company::create($request->validated());
        return (new CompanyResource($company))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Update an existing company.
     */
    public function update(UpdateCompanyRequest $request, Company $company): CompanyResource
    {
        $company->update($request->validated());
        
        // Business rule: If company is deactivated, deactivate all products
        if ($request->has('status') && $request->status === 'inactive') {
            $company->products()->update(['status' => 'inactive']);
        }
        
        return new CompanyResource($company->load('products'));
    }

    /**
     * Delete a company (soft delete).
     * Business rule: Cannot delete if company has products.
     */
    public function destroy(Company $company): JsonResponse
    {
        // Check if company has products
        if ($company->products()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete company. It has associated products.'
            ], 422);
        }
        
        $company->delete();
        
        return response()->json([
            'message' => 'Company deleted successfully.'
        ], 200);
    }
}
