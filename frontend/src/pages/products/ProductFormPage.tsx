import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productService } from '@/services/productService';
import { companyService } from '@/services/companyService';
import { Button, Input, Select, Alert, LoadingPage } from '@/components/ui';
import { CreateProductData, Company } from '@/types';

const productSchema = z.object({
  company_id: z.number().min(1, 'Empresa é obrigatória'),
  name: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome deve ter no máximo 255 caracteres'),
  sku: z.string().min(1, 'SKU é obrigatório').max(50, 'SKU deve ter no máximo 50 caracteres'),
  price: z.number().min(0, 'Preço deve ser maior ou igual a zero'),
  status: z.enum(['active', 'inactive'], { required_error: 'Status é obrigatório' }),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);
  const [error, setError] = useState<string | null>(null);

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(Number(id)),
    enabled: isEditing,
  });

  const { data: companies } = useQuery({
    queryKey: ['companies', { per_page: 100 }],
    queryFn: () => companyService.getAll({ per_page: 100 }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      company_id: 0,
      name: '',
      sku: '',
      price: 0,
      status: 'active',
    },
  });

  const watchedCompanyId = watch('company_id');

  const createMutation = useMutation({
    mutationFn: (data: CreateProductData) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/products');
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: CreateProductData) => productService.update(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      navigate('/products');
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const onSubmit = (data: ProductFormData) => {
    setError(null);
    const productData: CreateProductData = {
      company_id: data.company_id,
      name: data.name,
      sku: data.sku,
      price: data.price,
      status: data.status,
    };

    if (isEditing) {
      updateMutation.mutate(productData);
    } else {
      createMutation.mutate(productData);
    }
  };

  if (isLoadingProduct) {
    return <LoadingPage />;
  }

  const companyOptions = companies?.data.map((c: Company) => ({
    value: c.id,
    label: c.name,
  })) || [];

  // Set default values when product data loads
  if (product && watchedCompanyId === 0) {
    setValue('company_id', product.company_id);
    setValue('name', product.name);
    setValue('sku', product.sku);
    setValue('price', product.price);
    setValue('status', product.status);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para produtos
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {isEditing ? 'Editar Produto' : 'Novo Produto'}
        </h1>

        {error && (
          <Alert type="error" message={error} onClose={() => setError(null)} />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Select
            label="Empresa"
            value={watchedCompanyId || ''}
            onChange={(e) => setValue('company_id', Number(e.target.value))}
            error={errors.company_id?.message}
            options={[
              { value: '', label: 'Selecione uma empresa' },
              ...companyOptions,
            ]}
          />

          <Input
            label="Nome"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Nome do produto"
          />

          <Input
            label="SKU"
            {...register('sku')}
            error={errors.sku?.message}
            placeholder="SKU do produto"
          />

          <Input
            label="Preço"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
            placeholder="0,00"
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
            <Link to="/products">
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
