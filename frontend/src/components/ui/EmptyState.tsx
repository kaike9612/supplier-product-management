import { Package } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = 'Nenhum registro encontrado',
  description = 'Não há dados para exibir.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Package className="h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}
