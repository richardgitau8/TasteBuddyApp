import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter(fav => fav.idMeal !== idMeal);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  if (favorites.length === 0) {
    return <p className="text-center mt-4">No favorites added yet.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Favorite Recipes</h1>
      <ul>
        {favorites.map((recipe) => (
          <li key={recipe.idMeal} className="mb-4 border-b-2 pb-4">
            <h2 className="text-2xl">{recipe.strMeal}</h2>
            <p><strong>Category:</strong> {recipe.strCategory}</p>
            <p><strong>Cuisine:</strong> {recipe.strArea}</p>
            <div className="flex space-x-4 mt-2">
              <Link
                to={`/recipes/${recipe.idMeal}`}
                className="text-green-600 hover:text-green-800 underline"
              >
                View Details
              </Link>
              <button
                onClick={() => handleRemoveFromFavorites(recipe.idMeal)}
                className="bg-red-600 text-white px-4 py-2 ml-4 rounded-lg hover:bg-red-500"
              >
                Remove from Favorites
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
