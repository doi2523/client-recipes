// src/config/apiConfig.js
const API_BASE_URL = "http://localhost:5000/api";

const API = {
  selectRecipes: `${API_BASE_URL}/select-recipes`,
  deleteRecipe: (id) => `${API_BASE_URL}/delete-recipe/${id}`,
  addRecipes: `${API_BASE_URL}/add-recipes`,
  // Bạn có thể thêm các endpoint khác ở đây
};

export default API;