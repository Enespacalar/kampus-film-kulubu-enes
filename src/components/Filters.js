// src/components/Filters.js

import React, { useState } from 'react';

// Bu bileşen, Home'dan gelen dispatch'i ve mevcut filtreleri alır
const Filters = ({ dispatch, filters }) => {
  
  // PDF'in istediği 3 filtre alanı [cite: 31]
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // Değer değiştikçe, reducer'a SET_FILTERS eylemini yolla [cite: 22]
    dispatch({
      type: 'SET_FILTERS',
      payload: { [name]: value },
    });
  };

  return (
    <div className="filters-box">
      <input
        type="text"
        name="genre"
        placeholder="Türe göre filtrele..."
        value={filters.genre}
        onChange={handleFilterChange}
      />
      <input
        type="text"
        name="language"
        placeholder="Dile göre filtrele..."
        value={filters.language}
        onChange={handleFilterChange}
      />
      <input
        type="number"
        name="rating"
        placeholder="Min. Puan (örn: 8)"
        min="0"
        max="10"
        step="0.1"
        value={filters.rating === 0 ? '' : filters.rating} // 0'sa placeholder görünsün
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filters;