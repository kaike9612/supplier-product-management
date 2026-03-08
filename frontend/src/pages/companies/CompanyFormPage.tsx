import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyService } from '@/services/companyService';
import { Button, Input, Select, Alert, LoadingPage } from '@/components/ui';
import { CreateCompanyData, Status } from '@/types';

const companySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome deve ter no máximo 255 caracteres'),
  cnpj: z.string().min(1, 'CNPJ é obrigatório').max(18, 'CNPJ deve ter no máximo 18 caracteres'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  status: z.enum(['active', 'inactive'], { required_error: 'Status é obrigatório' }),
});

type CompanyFormData = z.infer<typeof companySchema>;

export function CompanyFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);
  const [error, setError] = useState<string | null>(null);

  const { data: company, isLoading: isLoadingCompany } = useQuery({
    queryKey: ['company', id],
    queryFn: () => companyService.getById(Number(id)),
    enabled: isEditing,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      cnpj: '',
      email: '',
      phone: '',
      address: '',
      status: 'active' as Status,
    },
  });

  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
        cnpj: company.cnpj,
        email: company.email,
        phone: company.phone || '',
        address: company.address || '',
        status: company.status,
      });
    }
  }, [company, reset]);

  const createMutation = useMutation({
    mutationFn: (data: CreateCompanyData) => companyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      navigate('/companies');
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: CreateCompanyData) => companyService.update(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['company', id] });
      navigate('/companies');
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const onSubmit: SubmitHandler<CompanyFormData> = (data) => {
    setError(null);
    const companyData: CreateCompanyData = {
      name: data.name,
      cnpj: data.cnpj,
      email: data.email,
      phone: data.phone || undefined,
      address: data.address || undefined,
      status: data.status,
    };

    if (isEditing) {
      updateMutation.mutate(companyData);
    } else {
      createMutation.mutate(companyData);
    }
  };

  if (isLoadingCompany) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          to="/companies"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para empresas
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {isEditing ? 'Editar Empresa' : 'Nova Empresa'}
        </h1>

        {error && (
          <Alert type="error" message={error} onClose={() => setError(null)} />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Nome"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Nome da empresa"
          />

          <Input
            label="CNPJ"
            {...register('cnpj')}
            error={errors.cnpj?.message}
            placeholder="00.000.000/0000-00"
          />

          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            placeholder="email@exemplo.com"
          />

          <Input
            label="Telefone"
            {...register('phone')}
            error={errors.phone?.message}
            placeholder="(00) 00000-0000"
          />

          <Input
            label="Endereço"
            {...register('address')}
            error={errors.address?.message}
            placeholder="Endereço da empresa"
          />

          <Select
            label="Status"
            {...register('status')}
            error={errors.status?.message}
            options={[
              { value: 'active', label: 'Ativo' },
              { value: 'inactive', label: 'Inativo' },
            ]}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Link to="/companies">
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              isLoading={createMutation.isPending || updateMutation.isPending}
            >
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
