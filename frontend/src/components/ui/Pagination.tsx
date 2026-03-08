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
  // Filter out pagination links that don't have URLs (like "Previous" or "Next" when disabled)
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
    <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-1">
          {pageLinks.map((link, index) => {
            // Extract page number from URL (e.g., "http://example.com?page=2" -> 2)
            const url = link.url || '';
            const pageMatch = url.match(/page=(\d+)/);
            const pageNum = pageMatch ? parseInt(pageMatch[1], 10) : index + 1;
            
            return (
              <button
                key={index}
                onClick={() => onPageChange(pageNum)}
                className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition-colors ${
                  link.active
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === lastPage}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <span className="text-sm text-gray-600">
        Página {currentPage} de {lastPage}
      </span>
    </div>
  );
}
