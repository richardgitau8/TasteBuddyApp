import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DrinkDetail = () => {
  const { id } = useParams();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchDrinkDetail = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch drink details');
        }
        const data = await response.json();
        setDrink(data.drinks[0]); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinkDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#D9D9D9] py-16 px-4"> 
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto text-center">
        
        {/* Back Navigation Button */}
        <div className="flex justify-start mb-4">
          <button
            className="text-[#F23A29] hover:text-white font-semibold bg-transparent hover:bg-[#F23A29] px-4 py-2 rounded transition-colors duration-300" // Updated button style
            onClick={() => navigate(-1)}  // 
          >
            ← Back
          </button>
        </div>

        {/* Drink Name */}
        <h1 className="text-3xl font-bold text-[#F23A29] mb-4">{drink.strDrink}</h1> 

        {/* Drink Image */}
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          className="w-full h-64 object-cover mb-4 rounded-md"
        />

        {/* Drink Category and Alcoholic Type */}
        <p className="text-lg"><strong>Category:</strong> {drink.strCategory}</p>
        <p className="text-lg"><strong>Type:</strong> {drink.strAlcoholic}</p>

        {/* Ingredients Section */}
        <h2 className="text-2xl font-semibold mt-6 text-[#F23A29]">Ingredients</h2> 
        <ul className="list-disc text-left pl-6">
          {Object.keys(drink)
            .filter(key => key.startsWith('strIngredient') && drink[key])
            .map((key, index) => (
              <li key={index} className="text-lg">
                {drink[key]} - {drink[`strMeasure${index + 1}`] || ''}
              </li>
            ))}
        </ul>

        {/* Instructions Section */}
        <h2 className="text-2xl font-semibold mt-6 text-[#F23A29]">Instructions</h2> 
        <p className="text-left text-lg">{drink.strInstructions}</p>

        {/* Video Section (if available) */}
        {drink.strVideo && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-[#F23A29]">Video</h2> 
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${drink.strVideo.split('=')[1]}`}
              frameBorder="0"
              allowFullScreen
              title="Drink Video"
              className="rounded-md"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrinkDetail;
