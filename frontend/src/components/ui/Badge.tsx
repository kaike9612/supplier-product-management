import { Status } from '@/types';

interface BadgeProps {
  status: Status;
}

export function Badge({ status }: BadgeProps) {
  const styles = {
    active: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    inactive: 'bg-slate-50 text-slate-600 border border-slate-100',
  };

  const labels = {
    active: 'Ativo',
    inactive: 'Inativo',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
