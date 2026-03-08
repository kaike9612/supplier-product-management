export type Status = 'active' | 'inactive';

export interface Company {
  id: number;
  name: string;
  cnpj: string;
  email: string;
  phone: string | null;
  address: string | null;
  status: Status;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  company_id: number;
  name: string;
  sku: string;
  price: number;
  status: Status;
  created_at: string;
  updated_at: string;
  company?: Company;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    per_page: number;
    to: number | null;
    total: number;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface CompanyFilters {
  name?: string;
  status?: Status;
  page?: number;
  per_page?: number;
}

export interface ProductFilters {
  name?: string;
  status?: Status;
  company_id?: number;
  page?: number;
  per_page?: number;
}

export interface CreateCompanyData {
  name: string;
  cnpj: string;
  email: string;
  phone?: string;
  address?: string;
  status: Status;
}

export interface UpdateCompanyData extends CreateCompanyData {}

export interface CreateProductData {
  company_id: number;
  name: string;
  sku: string;
  price: number;
  status: Status;
}

export interface UpdateProductData extends CreateProductData {}
