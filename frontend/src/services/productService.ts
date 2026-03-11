import api from '@/lib/axios';
import {
  Product,
  ProductFilters,
  CreateProductData,
  UpdateProductData,
  PaginatedResponse,
} from '@/types';

/**
 * Normalize product price from string to number
 * The Laravel API returns price as string (e.g., "981.93")
 */
function normalizeProduct(product: Product): Product {
  return {
    ...product,
    price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
  };
}

export const productService = {
  async getAll(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();
    
    if (filters.name) params.append('name', filters.name);
    if (filters.status) params.append('status', filters.status);
    if (filters.company_id) params.append('company_id', filters.company_id.toString());
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.per_page) params.append('per_page', filters.per_page.toString());

    const response = await api.get<PaginatedResponse<Product>>('/products', {
      params,
    });
    
    // Normalize price from string to number
    return {
      ...response.data,
      data: response.data.data.map(normalizeProduct),
    };
  },

  async getById(id: number): Promise<Product> {
    const response = await api.get<{ data: Product }>(`/products/${id}`);
    return normalizeProduct(response.data.data);
  },

  async create(data: CreateProductData): Promise<Product> {
    const response = await api.post<{ data: Product }>('/products', data);
    return normalizeProduct(response.data.data);
  },

  async update(id: number, data: UpdateProductData): Promise<Product> {
    const response = await api.put<{ data: Product }>(`/products/${id}`, data);
    return normalizeProduct(response.data.data);
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },

  async inactivate(id: number): Promise<void> {
    await api.patch(`/products/${id}/inactivate`);
  },

  async toggleStatus(id: number): Promise<Product> {
    const response = await api.patch<{ data: Product }>(`/products/${id}/toggle-status`);
    return normalizeProduct(response.data.data);
  },

  async getByCompany(companyId: number, filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();
    
    if (filters.name) params.append('name', filters.name);
    if (filters.status) params.append('status', filters.status);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.per_page) params.append('per_page', filters.per_page.toString());

    const response = await api.get<PaginatedResponse<Product>>(`/companies/${companyId}/products`, {
      params,
    });
    
    // Normalize price from string to number
    return {
      ...response.data,
      data: response.data.data.map(normalizeProduct),
    };
  },
};
