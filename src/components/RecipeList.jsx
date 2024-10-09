import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, error }) => {
  // State to manage favorite recipes
  const [favorites, setFavorites] = useState([]);

  // Function to toggle favorites
  const handleFavoriteToggle = (idMeal) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(idMeal)) {
        // Remove from favorites if already in the list
        return prevFavorites.filter((mealId) => mealId !== idMeal);
      } else {
        // Add to favorites
        return [...prevFavorites, idMeal];
      }
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onFavoriteToggle={handleFavoriteToggle}
          isFavorited={favorites.includes(recipe.idMeal)} // Check if the recipe is favorited
        />
      ))}
    </div>
  );
};

export default RecipeList;
