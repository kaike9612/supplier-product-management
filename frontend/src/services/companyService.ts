import api from '@/lib/axios';
import {
  Company,
  CompanyFilters,
  CreateCompanyData,
  UpdateCompanyData,
  PaginatedResponse,
} from '@/types';

export const companyService = {
  async getAll(filters: CompanyFilters = {}): Promise<PaginatedResponse<Company>> {
    const params = new URLSearchParams();
    
    if (filters.name) params.append('name', filters.name);
    if (filters.status) params.append('status', filters.status);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.per_page) params.append('per_page', filters.per_page.toString());

    const response = await api.get<PaginatedResponse<Company>>('/companies', {
      params,
    });
    return response.data;
  },

  async getById(id: number): Promise<Company> {
    const response = await api.get<{ data: Company }>(`/companies/${id}`);
    return response.data.data;
  },

  async create(data: CreateCompanyData): Promise<Company> {
    const response = await api.post<{ data: Company }>('/companies', data);
    return response.data.data;
  },

  async update(id: number, data: UpdateCompanyData): Promise<Company> {
    const response = await api.put<{ data: Company }>(`/companies/${id}`, data);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/companies/${id}`);
  },
};
