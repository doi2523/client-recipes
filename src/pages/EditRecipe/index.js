import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditRecipe = () => {
  const { id } = useParams(); // Lấy id công thức từ URL
  const [recipe, setRecipe] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/select-recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/update-recipe/${id}`, recipe)
      .then(() => {
        navigate("/recipes"); // Điều hướng về danh sách công thức sau khi sửa thành công
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Chỉnh Sửa Công Thức</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block">Tên Công Thức</label>
          <input
            type="text"
            value={recipe.name || ""}
            onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
            className="w-full p-2 border"
          />
        </div>
        {/* Các trường sửa khác (description, servings, etc.) */}
        <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
          Cập Nhật
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
