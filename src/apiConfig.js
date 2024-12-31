// src/config/apiConfig.js
const API_BASE_URL = "http://localhost:5000/api";
// const API_BASE_URL = "https://server-recipe-rn7e.onrender.com/api";

const API = {
  selectRecipes: `${API_BASE_URL}/select-recipes`,
  deleteRecipe: (id) => `${API_BASE_URL}/delete-recipe/${id}`,
  addRecipes: `${API_BASE_URL}/add-recipes`,
  updateRecipes: `${API_BASE_URL}/update-recipe`,
  getRecipeById: `${API_BASE_URL}/get-recipe`,
  // Bạn có thể thêm các endpoint khác ở đây
};

export default API;
