import React, { useState } from 'react';
import RecipeSearch from '../../components/RecipeSearch';
import FilterOptions from '../../components/FilterOptions';
import RecipeList from '../../components/RecipeList';

const RecipeSearchPage = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ cuisine: '', difficulty: '' });

  // Dữ liệu mẫu
  const recipesData = [
    { id: 1, name: 'Spaghetti Carbonara', cuisine: 'italian', difficulty: 'medium' },
    { id: 2, name: 'Sushi', cuisine: 'asian', difficulty: 'hard' },
    { id: 3, name: 'Burger', cuisine: 'american', difficulty: 'easy' },
    { id: 4, name: 'Pad Thai', cuisine: 'asian', difficulty: 'medium' },
    { id: 5, name: 'Tiramisu', cuisine: 'italian', difficulty: 'easy' },
  ];

  // Lọc công thức theo từ khóa và bộ lọc
  const filteredRecipes = recipesData.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(query.toLowerCase()) &&
      (filters.cuisine === '' || recipe.cuisine === filters.cuisine) &&
      (filters.difficulty === '' || recipe.difficulty === filters.difficulty)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl font-bold mb-6">Recipe Search</h1>
      <RecipeSearch query={query} setQuery={setQuery} />
      <FilterOptions filters={filters} setFilters={setFilters} />
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
};

export default RecipeSearchPage;
