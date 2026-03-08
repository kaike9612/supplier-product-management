import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { HomePage } from '@/pages/HomePage';
import { CompaniesListPage } from '@/pages/companies/CompaniesListPage';
import { CompanyFormPage } from '@/pages/companies/CompanyFormPage';
import { ProductsListPage } from '@/pages/products/ProductsListPage';
import { ProductFormPage } from '@/pages/products/ProductFormPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'companies',
        children: [
          {
            index: true,
            element: <CompaniesListPage />,
          },
          {
            path: 'new',
            element: <CompanyFormPage />,
          },
          {
            path: ':id/edit',
            element: <CompanyFormPage />,
          },
        ],
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <ProductsListPage />,
          },
          {
            path: 'new',
            element: <ProductFormPage />,
          },
          {
            path: ':id/edit',
            element: <ProductFormPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
