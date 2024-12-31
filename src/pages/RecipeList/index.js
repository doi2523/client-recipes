import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import API from "../../apiConfig";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate();  

  useEffect(() => {
    // Fetch the recipes along with ingredients and steps
    axios
      .get(API.selectRecipes)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEdit = (id) => {
    navigate(`/edit-recipe/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa công thức này?");
    if (confirmDelete) {
      axios
        .delete(API.deleteRecipe(id))
        .then(() => {
          setRecipes(recipes.filter(recipe => recipe.id !== id));
          alert("Công thức đã được xóa thành công!");
        })
        .catch((error) => {
          console.error("Lỗi khi xóa công thức:", error);
          alert("Đã có lỗi xảy ra khi xóa công thức.");
        });
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-gray-50 shadow-xl rounded-lg min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Danh Sách Công Thức</h2>
      <table className="min-w-full table-auto border-separate border-spacing-0 border-black">
        <thead>
          <tr className="bg-blue-100 text-blue-800">
            <th className="px-6 py-3 text-left font-medium">Hình Ảnh</th>
            <th className="px-6 py-3 text-left font-medium">Tên Công Thức</th>
            <th className="px-6 py-3 text-left font-medium">Quốc Gia</th>
            <th className="px-6 py-3 text-left font-medium">Khẩu Phần</th>
            <th className="px-6 py-3 text-left font-medium">Độ Khó</th>
            <th className="px-6 py-3 text-left font-medium">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 ">
          {recipes.map((recipe) => (
            <React.Fragment key={recipe.id}>
              <tr className="border-b">
                <td className="px-6 py-4">
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-20 h-20 object-cover rounded-full shadow-sm"
                    />
                  )}
                </td>
                <td className="px-6 py-4">{recipe.name}</td>
                <td className="px-6 py-4">{recipe.country}</td>
                <td className="px-6 py-4">{recipe.servings}</td>
                <td className="px-6 py-4">{recipe.difficulty}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleRow(recipe.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    {expandedRows[recipe.id] ? "Ẩn" : "Xem Chi Tiết"}
                  </button>
                  <button
                    onClick={() => handleEdit(recipe.id)}
                    className="text-green-500 hover:text-green-700 mr-2"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>

              {expandedRows[recipe.id] && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 bg-gray-100 border-t">
                    <div className="flex space-x-6">
                      <div className="flex-shrink-0 w-1/3">
                        {recipe.image && (
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                          />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="space-y-2">
                          <p><strong>Mô Tả:</strong> {recipe.description}</p>
                          <p><strong>Thời Gian Chuẩn Bị:</strong> {recipe.preparation_time}</p>
                          <p><strong>Thời Gian Nấu:</strong> {recipe.cooking_time}</p>
                          <p><strong>Thời Gian Thêm:</strong> {new Date(recipe.created_at).toLocaleString()}</p>
                          <p><strong>Thời Gian Sửa:</strong> {new Date(recipe.updated_at).toLocaleString()}</p>

                          <div>
                            <strong>Nguyên Liệu:</strong>
                            {recipe.ingredients && recipe.ingredients.length > 0 ? (
                              <ul className="list-disc ml-6">
                                {recipe.ingredients.map((ingredient, index) => (
                                  <li key={index}>
                                    {ingredient.name} - {ingredient.quantity} {ingredient.unit || ''}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>Không có nguyên liệu</p>
                            )}
                          </div>

                          <div>
                            <strong>Các Bước:</strong>
                            {recipe.steps && recipe.steps.length > 0 ? (
                              <ol className="list-decimal ml-6">
                                {recipe.steps.map((step, index) => (
                                  <li key={index}>
                                    {step.step_number}. {step.instruction}
                                  </li>
                                ))}
                              </ol>
                            ) : (
                              <p>Không có bước nào</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeList;
