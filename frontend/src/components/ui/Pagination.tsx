import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}

export function Pagination({ currentPage, lastPage, onPageChange, links }: PaginationProps) {
  const pageLinks = links.filter(
    (link) => link.url !== null && !link.label.includes('&laquo;') && !link.label.includes('&raquo;')
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  if (lastPage <= 1) return null;

  return (
    <div className="flex items-center justify-between px-5 py-3.5 bg-white border border-slate-100 rounded-xl shadow-sm">
      <div className="flex items-center gap-1">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-600"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-1.5 mx-1">
          {pageLinks.map((link, index) => {
            const url = link.url || '';
            const pageMatch = url.match(/page=(\d+)/);
            const pageNum = pageMatch ? parseInt(pageMatch[1], 10) : index + 1;
            
            return (
              <button
                key={index}
                onClick={() => onPageChange(pageNum)}
                className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                  link.active
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === lastPage}
          className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-600"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <span className="text-sm text-slate-500 font-medium">
        Página {currentPage} de {lastPage}
      </span>
    </div>
  );
}
