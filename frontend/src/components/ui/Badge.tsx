import { Status } from '@/types';

interface BadgeProps {
  status: Status;
}

export function Badge({ status }: BadgeProps) {
  const styles = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
  };

  const labels = {
    active: 'Ativo',
    inactive: 'Inativo',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
