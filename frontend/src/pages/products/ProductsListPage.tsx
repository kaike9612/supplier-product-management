import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Package, ToggleLeft, ToggleRight } from 'lucide-react';
import { productService } from '@/services/productService';
import { companyService } from '@/services/companyService';
import { Product, Status, Company } from '@/types';
import { Button, Input, Select, Badge, LoadingPage, EmptyState, Alert, Modal, Pagination } from '@/components/ui';

export function ProductsListPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    status: '' as Status | '',
    company_id: '' as number | '',
  });

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; product: Product | null }>({
    isOpen: false,
    product: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const filterParams = {
    ...(filters.name && { name: filters.name }),
    ...(filters.status && { status: filters.status as Status }),
    ...(filters.company_id && { company_id: filters.company_id as number }),
  };

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', { page, ...filterParams }],
    queryFn: () => productService.getAll({ page, ...filterParams }),
  });

  const { data: companies } = useQuery({
    queryKey: ['companies', { per_page: 100 }],
    queryFn: () => companyService.getAll({ per_page: 100 }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setDeleteModal({ isOpen: false, product: null });
      setSuccess('Produto excluído com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
    },
    onError: (err: Error) => {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    },
  });

  const inactivateMutation = useMutation({
    mutationFn: (id: number) => productService.inactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setSuccess('Produto inativado com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
    },
    onError: (err: Error) => {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleDelete = (product: Product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const confirmDelete = () => {
    if (deleteModal.product) {
      deleteMutation.mutate(deleteModal.product.id);
    }
  };

  const handleInactivate = (product: Product) => {
    if (product.status === 'active') {
      inactivateMutation.mutate(product.id);
    }
  };

  if (isLoadingProducts) return <LoadingPage />;

  const companyOptions = companies?.data.map((c: Company) => ({
    value: c.id,
    label: c.name,
  })) || [];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Produtos</h1>
          <p className="page-subtitle">Gerencie os produtos das empresas</p>
        </div>
        <Link to="/products/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </Link>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      {success && (
        <Alert type="success" message={success} onClose={() => setSuccess(null)} />
      )}

      {/* Filter Bar */}
      <div className="filter-bar">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nome..."
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              value={filters.company_id}
              onChange={(e) => setFilters({ ...filters, company_id: e.target.value ? Number(e.target.value) : '' })}
              options={[
                { value: '', label: 'Todas as empresas' },
                ...companyOptions,
              ]}
            />
          </div>
          <div className="w-full md:w-40">
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as Status | '' })}
              options={[
                { value: '', label: 'Todos os status' },
                { value: 'active', label: 'Ativo' },
                { value: 'inactive', label: 'Inativo' },
              ]}
            />
          </div>
          <Button type="submit">Buscar</Button>
        </form>
      </div>

      {products?.data.length === 0 ? (
        <EmptyState
          title="Nenhum produto encontrado"
          description="Tente ajustar os filtros ou adicione um novo produto."
        />
      ) : (
        <>
          {/* Premium Table */}
          <div className="table-container">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell">
                      Produto
                    </th>
                    <th className="table-header-cell">
                      SKU
                    </th>
                    <th className="table-header-cell">
                      Empresa
                    </th>
                    <th className="table-header-cell">
                      Preço
                    </th>
                    <th className="table-header-cell">
                      Status
                    </th>
                    <th className="table-header-cell text-right">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {products?.data.map((product) => (
                    <tr key={product.id} className="table-row">
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
                            <Package className="h-4 w-4 text-primary-600" />
                          </div>
                          <span className="font-medium text-slate-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="table-cell text-slate-600">
                        {product.sku}
                      </td>
                      <td className="table-cell text-slate-600">
                        {product.company?.name || '-'}
                      </td>
                      <td className="table-cell font-medium text-slate-900">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="table-cell">
                        <Badge status={product.status} />
                      </td>
                      <td className="table-cell text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleInactivate(product)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              product.status === 'active'
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-slate-400 hover:bg-slate-100'
                            }`}
                            title={product.status === 'active' ? 'Inativar' : 'Ativar'}
                          >
                            {product.status === 'active' ? (
                              <ToggleRight className="h-5 w-5" />
                            ) : (
                              <ToggleLeft className="h-5 w-5" />
                            )}
                          </button>
                          <Link to={`/products/${product.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(product)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {products?.meta && (
            <Pagination
              currentPage={products.meta.current_page}
              lastPage={products.meta.last_page}
              links={products.meta.links}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, product: null })}
        title="Excluir Produto"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-600">
            Tem certeza que deseja excluir o produto <strong>{deleteModal.product?.name}</strong>?
          </p>
          <p className="text-sm text-slate-500">
            Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ isOpen: false, product: null })}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              isLoading={deleteMutation.isPending}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
