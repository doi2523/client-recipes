import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-5xl font-bold text-blue-600 mb-6">Welcome to Cooking Recipes</h1>
      <p className="text-lg text-gray-700 mb-6">
        Find, add, and edit your favorite cooking recipes. Let's start exploring!
      </p>
      <div className="space-x-4">
        <Link
          to="/addrecipe"
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Add a Recipe
        </Link>
        <Link
          to="/recipelist"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          View Recipes
        </Link>
      </div>
    </div>
  );
}

export default Home;
