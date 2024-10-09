import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { fetchRecipes } from '../api'; // Ensure this fetches from the correct API

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    if (!query) {
      setError('Please enter a search term.');
      return;
    }

    try {
      const data = await fetchRecipes(query.trim().toLowerCase()); // Trim and lowercase the query
      if (data.meals && Array.isArray(data.meals)) {
        // Filter based on dish name or category, ensure lowercase comparison
        const filteredMeals = data.meals.filter(meal =>
          meal.strMeal.toLowerCase().includes(query.toLowerCase()) ||
          (meal.strCategory && meal.strCategory.toLowerCase() === query.toLowerCase())
        );
        
        if (filteredMeals.length > 0) {
          setSearchResults(filteredMeals);
          setError('');
        } else {
          setSearchResults([]);
          setError('No recipes found.');
        }
      } else {
        setSearchResults([]);
        setError('No recipes found.');
      }
    } catch (err) {
      setError('An error occurred while fetching recipes.');
    }
  };

  return (
    <div className="container mx-auto py-16">
      <SearchBar onSearch={handleSearch} />

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Render Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {searchResults.map((recipe) => (
          <div key={recipe.idMeal} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-lg">{recipe.strMeal}</h3>
              <p className="text-gray-600 mb-4">{recipe.strCategory} | {recipe.strArea}</p>
              <a href={`/recipes/${recipe.idMeal}`} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500">
                View Recipe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
