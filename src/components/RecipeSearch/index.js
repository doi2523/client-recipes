import React from 'react';

const RecipeSearch = ({ query, setQuery }) => {
  return (
    <div className="flex justify-center mt-8">
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-3/4 md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default RecipeSearch;
