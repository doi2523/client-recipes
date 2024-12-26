import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-700">The page you are looking for does not exist.</p>
      <button
        onClick={goHome}
        className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none"
      >
        Go Back Home
      </button>
    </div>
  );
}

export default PageNotFound;
