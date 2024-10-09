import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TrendingRecipes = () => {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingRecipes = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=American');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setTrendingRecipes(data.meals); // Assume the data is an array of recipes
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingRecipes();
  }, []);

  if (loading) return <div className="text-black">Loading...</div>;
  if (error) return <div className="text-black">Error: {error}</div>;

  return (
    <div className="container mx-auto py-16 px-4 lg:px-8"> {/* Added padding on left and right */}
      <h1 className="text-3xl font-bold text-center mb-8 text-[#F23A29]">Trending Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trendingRecipes.map((recipe) => (
          <div key={recipe.idMeal} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-lg text-black">{recipe.strMeal}</h3>
              <p className="text-black mb-4">{recipe.strInstructions || "No instructions available."}</p>
              <Link to={`/recipes/${recipe.idMeal}`} className="bg-[#F23A29] text-white py-2 px-4 rounded-lg hover:bg-[#e02e22] transition-colors duration-300">
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingRecipes;
