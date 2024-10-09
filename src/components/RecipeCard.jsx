import React from 'react';
import { Link } from 'react-router-dom';
import heartIcon from '../assets/heart.png'; 

const RecipeCard = ({ recipe, onFavoriteToggle, isFavorited }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 h-full relative">
     
      <button
        onClick={() => onFavoriteToggle(recipe.idMeal)}
        className="absolute top-4 right-4 focus:outline-none"
      >
        <img
          src={heartIcon}
          alt="Favorite"
          className={`w-6 h-6 transition duration-300 ${isFavorited ? 'opacity-100' : 'opacity-50'}`}
        />
      </button>

      
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-56 object-cover rounded-md" 
      />
      <h3 className="mt-2 text-lg font-semibold">{recipe.strMeal}</h3>
      <p className="text-gray-600">Category: {recipe.strCategory}</p>
      <p className="text-gray-600">Cuisine: {recipe.strArea}</p>

      {/* Pass the recipe's idMeal in the link */}
      <Link
        to={`/recipes/${recipe.idMeal}`}
        className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-500 transition duration-300"
      >
        View Recipe
      </Link>
    </div>
  );
};

export default RecipeCard;
