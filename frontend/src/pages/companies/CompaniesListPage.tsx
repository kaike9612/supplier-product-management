import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Building2 } from 'lucide-react';
import { companyService } from '@/services/companyService';
import { Company, Status } from '@/types';
import { Button, Input, Select, Badge, LoadingPage, EmptyState, Alert, Modal, Pagination } from '@/components/ui';

export function CompaniesListPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    status: '' as Status | '',
  });

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; company: Company | null }>({
    isOpen: false,
    company: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const filterParams = {
    ...(filters.name && { name: filters.name }),
    ...(filters.status && { status: filters.status as Status }),
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['companies', { page, ...filterParams }],
    queryFn: () => companyService.getAll({ page, ...filterParams }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => companyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      setDeleteModal({ isOpen: false, company: null });
      setSuccess('Empresa excluída com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
    },
    onError: (error: Error) => {
      setError(error.message);
      setTimeout(() => setError(null), 5000);
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleDelete = (company: Company) => {
    setDeleteModal({ isOpen: true, company });
  };

  const confirmDelete = () => {
    if (deleteModal.company) {
      deleteMutation.mutate(deleteModal.company.id);
    }
  };

  if (isLoading) return <LoadingPage />;

  if (isError) return <EmptyState title="Erro" description="Falha ao carregar empresas" />;

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Empresas</h1>
          <p className="page-subtitle">Gerencie as empresas fornecedoras</p>
        </div>
        <Link to="/companies/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Empresa
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

      {data?.data.length === 0 ? (
        <EmptyState
          title="Nenhuma empresa encontrada"
          description="Tente ajustar os filtros ou adicione uma nova empresa."
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
                      Nome
                    </th>
                    <th className="table-header-cell">
                      CNPJ
                    </th>
                    <th className="table-header-cell">
                      Email
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
                  {data?.data.map((company) => (
                    <tr key={company.id} className="table-row">
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
                            <Building2 className="h-4 w-4 text-primary-600" />
                          </div>
                          <span className="font-medium text-slate-900">{company.name}</span>
                        </div>
                      </td>
                      <td className="table-cell text-slate-600">
                        {company.cnpj}
                      </td>
                      <td className="table-cell text-slate-600">
                        {company.email}
                      </td>
                      <td className="table-cell">
                        <Badge status={company.status} />
                      </td>
                      <td className="table-cell text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link to={`/companies/${company.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(company)}
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

          {data?.meta && (
            <Pagination
              currentPage={data.meta.current_page}
              lastPage={data.meta.last_page}
              links={data.meta.links}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, company: null })}
        title="Excluir Empresa"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-600">
            Tem certeza que deseja excluir a empresa <strong>{deleteModal.company?.name}</strong>?
          </p>
          <p className="text-sm text-slate-500">
            Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ isOpen: false, company: null })}
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
