// src/components/SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        className="flex-grow p-2 border text-black border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Tìm kiếm công thức..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
      >
        Tìm
      </button>
    </form>
  );
};

export default SearchBar;
