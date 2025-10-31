// src/components/Pagination.js

import React from 'react';

const Pagination = ({ currentPage, totalItems, pageSize, dispatch }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch({ type: 'SET_PAGE', payload: newPage });
    }
  };

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        İlk
      </button>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Geri
      </button>
      <span>
        Sayfa {currentPage} / {totalPages}
      </span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        İleri
      </button>
      <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
        Son
      </button>
    </div>
  );
};

export default Pagination;