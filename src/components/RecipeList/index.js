import React from 'react';

const RecipeList = ({ recipes }) => {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="p-4 border rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-bold">{recipe.name}</h2>
          <p className="text-sm text-gray-500">Cuisine: {recipe.cuisine}</p>
          <p className="text-sm text-gray-500">Difficulty: {recipe.difficulty}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
