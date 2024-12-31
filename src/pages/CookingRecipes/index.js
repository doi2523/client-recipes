import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../apiConfig";

const RecipeGrid = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [servingOptions, setServingOptions] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    country: "",
    servings: "",
    difficulty: "",
    preparationTime: "",
    cookingTime: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipes from API
    axios
      .get(API.selectRecipes)
      .then((response) => {
        setRecipes(response.data);
        setFilteredRecipes(response.data);

        // Extract unique countries, servings, and difficulties from the data
        const uniqueCountries = [
          ...new Set(response.data.map((recipe) => recipe.country)),
        ];
        setCountries(uniqueCountries);

        const uniqueServings = [
          ...new Set(response.data.map((recipe) => recipe.servings)),
        ].sort((a, b) => a - b);
        setServingOptions(uniqueServings);

        const uniqueDifficulties = [
          ...new Set(response.data.map((recipe) => recipe.difficulty)),
        ];
        setDifficulties(uniqueDifficulties);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  useEffect(() => {
    // Apply filters whenever they change
    let filtered = [...recipes];

    if (filters.name) {
      const searchName = filters.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      filtered = filtered.filter((recipe) => {
        const recipeName = recipe.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return recipeName.includes(searchName);
      });
    }

    if (filters.country) {
      filtered = filtered.filter(
        (recipe) => recipe.country === filters.country
      );
    }

    if (filters.servings) {
      filtered = filtered.filter(
        (recipe) => recipe.servings.toString() === filters.servings
      );
    }

    if (filters.difficulty) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
      );
    }

    setFilteredRecipes(filtered);
  }, [filters, recipes]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleNavigate = (id) => {
    navigate(`/recipe-detail/${id}`);
  };

  return (
    <div className="w-full mx-auto p-6 bg-gray-50 dark:bg-gray-900 shadow-xl min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
        Công Thức
      </h2>

      <div className="mb-6 flex items-center space-x-4 w-full">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Nhập tên món ăn..."
          className="p-4 w-full text-lg rounded-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
          aria-label="Toggle Filters"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            {showFilters ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap justify-center space-x-4 mt-6">
          <select
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Quốc gia</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            name="servings"
            value={filters.servings}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Khẩu phần ăn</option>
            {servingOptions.map((serving) => (
              <option key={serving} value={serving}>
                {serving}
              </option>
            ))}
          </select>

          <select
            name="difficulty"
            value={filters.difficulty}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Độ khó</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => handleNavigate(recipe.id)}
            className="relative cursor-pointer bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
          >
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {recipe.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-bold">Độ Khó:</span> {recipe.difficulty}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-bold">Khẩu phần:</span> {recipe.servings}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-bold">Thời gian nấu:</span>{" "}
                {recipe.cooking_time}
              </p>
            </div>
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-white">
                {recipe.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
