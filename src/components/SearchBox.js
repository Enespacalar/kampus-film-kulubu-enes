// src/components/SearchBox.js

import React, { useState } from 'react';

const SearchBox = ({ dispatch }) => {
  const [searchTerm, setSearchTerm] = useState('friends');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_QUERY', payload: searchTerm });
  };

  return (
    <form onSubmit={handleSearch} className="search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Dizi ara..."
      />
      <button type="submit">Ara</button>
    </form>
  );
};

export default SearchBox;