<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Services\CompanyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CompanyController extends Controller
{
    public function __construct(
        private CompanyService $companyService
    ) {}

    /**
     * List all companies with pagination and filters.
     */
    public function index(\Illuminate\Http\Request $request): AnonymousResourceCollection
    {
        $filters = $request->only(['name', 'status']);
        $companies = $this->companyService->getAll($filters);
        return CompanyResource::collection($companies);
    }

    /**
     * Show a single company.
     */
    public function show(int $id): JsonResponse|CompanyResource
    {
        $company = $this->companyService->findById($id);
        
        if (!$company) {
            return response()->json([
                'message' => 'Empresa não encontrada.'
            ], 404);
        }

        return new CompanyResource($company);
    }

    /**
     * Create a new company.
     */
    public function store(StoreCompanyRequest $request): JsonResponse
    {
        $company = $this->companyService->create($request->validated());
        return (new CompanyResource($company->load('products')))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Update an existing company.
     */
    public function update(UpdateCompanyRequest $request, int $id): JsonResponse|CompanyResource
    {
        $company = $this->companyService->findById($id);
        
        if (!$company) {
            return response()->json([
                'message' => 'Empresa não encontrada.'
            ], 404);
        }

        $company = $this->companyService->update($company, $request->validated());
        return new CompanyResource($company);
    }

    /**
     * Delete a company (physical deletion).
     * Business rule: Cannot delete if company has any products (active or inactive).
     */
    public function destroy(int $id): JsonResponse
    {
        $company = $this->companyService->findById($id);
        
        if (!$company) {
            return response()->json([
                'message' => 'Empresa não encontrada.'
            ], 404);
        }

        $result = $this->companyService->delete($company);

        if (!$result['success']) {
            return response()->json([
                'message' => $result['message']
            ], 400);
        }

        return response()->json([
            'message' => $result['message']
        ], 200);
    }
}
