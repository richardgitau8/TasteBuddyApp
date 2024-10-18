import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();  // Extract the id from the route
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (response.data.meals) {
          setRecipe(response.data.meals[0]);
        } else {
          setError('Recipe not found.');
        }
      } catch (error) {
        setError('Failed to fetch recipe details.');
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8"> 
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto text-center">
        {/* Back Navigation Arrow */}
        <div className="flex justify-start mb-4">
          <button 
            className="text-gray-600 hover:text-gray-800 font-semibold" 
            onClick={() => navigate(-1)}  // Go back to previous page
          >
            ← Back
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-4">{recipe.strMeal}</h1>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-64 object-cover mb-4 rounded-md" />
        <p><strong>Category:</strong> {recipe.strCategory}</p>
        <p><strong>Cuisine:</strong> {recipe.strArea}</p>

        <h2 className="text-xl font-semibold mt-6">Ingredients</h2>
        <ul className="list-disc text-left pl-6">
          {Array.from({ length: 20 }, (_, i) => (
            recipe[`strIngredient${i + 1}`] && (
              <li key={i}>
                {recipe[`strIngredient${i + 1}`]} - {recipe[`strMeasure${i + 1}`]}
              </li>
            )
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6">Instructions</h2>
        <p className="text-left">{recipe.strInstructions}</p>

        {recipe.strYoutube && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Video</h2>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}`}
              frameBorder="0"
              allowFullScreen
              title="Recipe Video"
              className="rounded-md"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
