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
    const response = await api.get<Company>(`/companies/${id}`);
    return response.data;
  },

  async create(data: CreateCompanyData): Promise<Company> {
    const response = await api.post<Company>('/companies', data);
    return response.data;
  },

  async update(id: number, data: UpdateCompanyData): Promise<Company> {
    const response = await api.put<Company>(`/companies/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/companies/${id}`);
  },

  async inactivate(id: number): Promise<void> {
    await api.patch(`/companies/${id}/inactivate`);
  },
};
