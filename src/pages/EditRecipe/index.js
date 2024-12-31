import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../apiConfig";
import { useParams, useNavigate } from "react-router-dom";

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState("dễ");
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [country, setCountry] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Fetch the current recipe data based on the recipe id
    axios
      .get(`${API.getRecipeById}/${id}`)
      .then((response) => {
        const recipe = response.data;
        setName(recipe.name);
        setDescription(recipe.description);
        setServings(recipe.servings);
        setPreparationTime(recipe.preparation_time);
        setCookingTime(recipe.cooking_time);
        setDifficulty(recipe.difficulty);
        
        // Ensure steps and ingredients are parsed correctly if they are strings
        setSteps(Array.isArray(recipe.steps) ? recipe.steps : JSON.parse(recipe.steps));
        setIngredients(Array.isArray(recipe.ingredients) ? recipe.ingredients : JSON.parse(recipe.ingredients));
        
        setCountry(recipe.country);
        setImage(recipe.image); // If the recipe has an image
      })
      .catch((error) => {
        console.error("Error fetching recipe data:", error);
      });
  }, [id]);

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("servings", servings);
    formData.append("preparation_time", preparationTime);
    formData.append("cooking_time", cookingTime);
    formData.append("difficulty", difficulty);
    formData.append("steps", JSON.stringify(steps));
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("country", country);
    if (image) formData.append("image", image);

    axios
      .put(`${API.updateRecipes}/${id}`, formData)
      .then(() => {
        alert("Công thức đã được cập nhật thành công!");
        navigate(`/`); // Redirect after successful update
      })
      .catch((error) => {
        console.log("Error:", error.response?.data || error.message);
        alert(
          "Lỗi xảy ra: " + (error.response?.data?.message || error.message)
        );
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">Sửa Công Thức Nấu Ăn</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe Name, Description, and Country */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Tên Công Thức:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Quốc gia:
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Mô Tả:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">Hình Ảnh:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Servings, Preparation Time, Cooking Time, and Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Khẩu phần cho:
            </label>
            <input
              type="text"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              placeholder="3-4 người"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Thời Gian Chuẩn Bị:
            </label>
            <input
              type="text"
              value={preparationTime}
              onChange={(e) => setPreparationTime(e.target.value)}
              placeholder="Không có (nếu không có)"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Thời Gian Nấu:
            </label>
            <input
              type="text"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              placeholder="Không có (nếu không có)"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Độ Khó:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="dễ">Dễ</option>
              <option value="trung bình">Trung Bình</option>
              <option value="khó">Khó</option>
            </select>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Nguyên Liệu:</h3>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-5/12 space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Nguyên Liệu {index + 1}:
                </label>
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  placeholder="Tên Nguyên Liệu"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-5/12 space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Số Lượng:
                </label>
                <input
                  type="text"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  placeholder="Số Lượng"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="ml-2 bg-gray-300 text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2"
          >
            Thêm Nguyên Liệu
          </button>
        </div>

        {/* Steps Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Các Bước:</h3>
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-full space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Bước {index + 1}:
                </label>
                <textarea
                  value={step.instruction}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  placeholder="Mô Tả Các Bước"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveStep(index)}
                className="ml-2 bg-gray-300 text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddStep}
            className="text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2"
          >
            Thêm Bước
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200"
        >
          Cập Nhật Công Thức
        </button>
      </form>
    </div>
  );
};

export default EditRecipeForm;
