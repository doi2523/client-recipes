import React from 'react';

const FilterOptions = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center space-x-4 mt-6">
      <select
        name="cuisine"
        value={filters.cuisine}
        onChange={handleFilterChange}
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Cuisines</option>
        <option value="italian">Italian</option>
        <option value="asian">Asian</option>
        <option value="american">American</option>
      </select>
      <select
        name="difficulty"
        value={filters.difficulty}
        onChange={handleFilterChange}
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default FilterOptions;
