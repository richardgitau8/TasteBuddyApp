import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const SearchResults = ({ recipes }) => {
  // Check for empty recipes array
  if (!recipes || recipes.length === 0) {
    return <p className="text-gray-600">No recipes or drinks found.</p>;
  }

  // Group recipes by category (handles both food and drink categories)
  const categorizedRecipes = recipes.reduce((acc, recipe) => {
    const category = recipe.strCategory || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(recipe);
    return acc;
  }, {});

  return (
    <div className="container mx-auto py-6">
      {Object.keys(categorizedRecipes).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorizedRecipes[category].map((recipe) => (
              <div 
                key={recipe.idMeal || recipe.idDrink}  // Ensure to use idMeal for food and idDrink for drinks
                className="border rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={recipe.strMealThumb || recipe.strDrinkThumb}  // Use strDrinkThumb for drinks
                  alt={recipe.strMeal ? `${recipe.strMeal} dish` : `${recipe.strDrink} drink`}  // Display correct alt text
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">
                    {recipe.strMeal || recipe.strDrink}  {/* Display meal or drink name */}
                  </h3>
                  <p className="text-gray-600">
                    {recipe.strArea || recipe.strAlcoholic || 'Unknown Area'} {/* Display cuisine, alcoholic type, or default */}
                  </p>
                  <Link 
                    to={recipe.idMeal ? `/recipes/${recipe.idMeal}` : `/drinks/${recipe.idDrink}`}  // Link to correct page
                    className="text-[#F23A29] mt-4 inline-block"
                  >
                    View {recipe.idMeal ? 'Recipe' : 'Drink'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
