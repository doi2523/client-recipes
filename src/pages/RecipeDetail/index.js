import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API from "../../apiConfig";

const RecipeDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Gọi API để lấy chi tiết công thức
    axios
      .get(`${API.getRecipeById}/${id}`) // Đảm bảo endpoint chính xác
      .then((response) => {
        setRecipe(response.data); // Lưu dữ liệu công thức vào state
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error);
      });
  }, [id]);

  if (!recipe) {
    return <div className="text-center text-xl mt-10">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors">
      <h1 className="text-4xl font-bold text-center pt-6">{recipe.name}</h1>
      <main className="flex flex-col items-center mt-6">
        {/* Recipe Overview */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
          {/* Image Section */}
          <div className="md:w-1/2">
            <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Recipe Information */}
          <div className="md:w-1/2 space-y-4">
            <p className="text-lg">
              <span className="font-semibold">Mô tả:</span> {recipe.description}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Độ khó:</span> {recipe.difficulty}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Thời gian chuẩn bị:</span> {recipe.preparation_time}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Thời gian nấu:</span> {recipe.cooking_time}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Phần ăn:</span> {recipe.servings}
            </p>
          </div>
        </div>

        {/* Ingredients Section */}
        <section className="w-full max-w-6xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nguyên liệu</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-lg">
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </section>

        {/* Steps Section */}
        <section className="w-full max-w-6xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Các bước thực hiện</h2>
          <ol className="list-decimal list-inside space-y-4 text-lg">
            {recipe.steps.map((step, index) => (
              <li key={index}>
                <span className="font-semibold">Bước {step.step_number}:</span> {step.instruction}
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
};

export default RecipeDetail;
