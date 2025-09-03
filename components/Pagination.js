'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  pageSize, 
  onPageChange,
  loading = false 
}) => {
  // Don't show pagination if there's only one page or no data
  if (totalPages <= 1) {
    return null;
  }

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        // Show first pages
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last pages
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show middle pages
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();
  
  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage && !loading) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !loading) {
      onPageChange(currentPage + 1);
    }
  };

  const startItem = ((currentPage - 1) * pageSize) + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 mt-8">
      {/* Pagination Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="text-sm text-gray-600">
          Mostrando <span className="font-semibold text-gray-900">{startItem}</span> a{' '}
          <span className="font-semibold text-gray-900">{endItem}</span> de{' '}
          <span className="font-semibold text-gray-900">{totalItems}</span> resultados
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1 || loading}
            className={`
              relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg
              transition-all duration-200
              ${currentPage === 1 || loading
                ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                : 'text-gray-700 bg-white hover:bg-gray-50 hover:text-blue-600 shadow-sm hover:shadow-md border border-gray-200'
              }
            `}
          >
            <ChevronLeft size={16} className="mr-1" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {pageNumbers.map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-sm text-gray-400"
                  >
                    <MoreHorizontal size={16} />
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  disabled={loading}
                  className={`
                    relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg
                    transition-all duration-200 min-w-[40px] justify-center
                    ${page === currentPage
                      ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                      : 'text-gray-700 bg-white hover:bg-gray-50 hover:text-blue-600 shadow-sm hover:shadow-md border border-gray-200'
                    }
                    ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                  `}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || loading}
            className={`
              relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg
              transition-all duration-200
              ${currentPage === totalPages || loading
                ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                : 'text-gray-700 bg-white hover:bg-gray-50 hover:text-blue-600 shadow-sm hover:shadow-md border border-gray-200'
              }
            `}
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600">Cargando más resultados...</span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
