import React, { useEffect, useState } from 'react';
import heroImage2 from '../assets/hero2.jpg';
import { fetchRecipes } from '../api';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';

const HomePage = () => {
  const [, setFeaturedRecipes] = useState([]);
  const [recipeOfTheDay, setRecipeOfTheDay] = useState({});
  const [topRatedRecipes, setTopRatedRecipes] = useState([]);
  const [topTrendingDrinks, setTopTrendingDrinks] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [, setLoadingDrinks] = useState(true);
  const [loadingTrendingRecipes, setLoadingTrendingRecipes] = useState(true);
  const [recipeError, setRecipeError] = useState('');
  const [drinkError, setDrinkError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const data = await fetchRecipes();
        if (data.meals && Array.isArray(data.meals) && data.meals.length > 0) {
          setFeaturedRecipes(data.meals.slice(0, 4));
          setRecipeOfTheDay(data.meals[0]);
          setTopRatedRecipes(data.meals.slice(4, 8));
          setTrendingRecipes(data.meals.slice(8, 11));
        } else {
          setFeaturedRecipes([]);
          setRecipeOfTheDay({});
          setTopRatedRecipes([]);
          setTrendingRecipes([]);
          setRecipeError('No recipes found.');
        }
      } catch (err) {
        setRecipeError('An error occurred while fetching recipes.');
      } finally {
        setLoadingRecipes(false);
        setLoadingTrendingRecipes(false);
      }
    };

    const fetchDrinkData = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
        const data = await response.json();
        setTopTrendingDrinks(data.drinks.slice(0, 4));
      } catch (err) {
        setDrinkError('Failed to fetch drinks.');
      } finally {
        setLoadingDrinks(false);
      }
    };

    fetchRecipeData();
    fetchDrinkData();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) {
      setSearchError('Please enter a search term.');
      return;
    }

    setLoadingSearch(true);
    setSearchError('');
    try {
      const data = await fetchRecipes(searchTerm.trim().toLowerCase());
      if (data.meals) {
        setSearchResults(data.meals);
      } else {
        setSearchResults([]);
        setSearchError('No recipes found for your search.');
      }
    } catch (err) {
      setSearchError('An error occurred while fetching search results.');
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <div className="mx-4">
      {/* Search Bar */}
      <div className="flex justify-center items-center my-8">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-4 py-2 w-1/2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F23A29] transition duration-300"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="ml-4 bg-[#F23A29] text-white py-2 px-4 rounded-lg hover:bg-[#C22A1D] transition duration-300"
        >
          Search
        </button>
      </div>

      {/* Display Search Results if a search is made */}
      {loadingSearch ? (
        <p className="text-center">Searching...</p>
      ) : searchError ? (
        <p className="text-red-500 text-center">{searchError}</p>
      ) : searchResults.length > 0 ? (
        <SearchResults recipes={searchResults} />
      ) : (
        <>
          {/* Hero Section */}
          <div
            className="relative w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage2})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
              <h1 className="text-5xl font-bold text-white mb-4">Discover Delicious Recipes</h1>
              <p className="text-xl text-gray-200 mb-6">Explore, cook, and share your favorite meals.</p>
              <Link to="/signup"> 
                <button className="bg-[#F23A29] text-white py-3 px-8 rounded-lg hover:bg-[#C22A1D] text-lg transition duration-300">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Recipe of the Day Section */}
          <section className="bg-[#D9D9D9] py-16">
            <h2 className="text-4xl font-bold text-center mb-8 text-black">Recipe of the Day</h2>
            {loadingRecipes ? (
              <p className="text-center">Loading recipe...</p>
            ) : recipeError ? (
              <p className="text-red-500 text-center">{recipeError}</p>
            ) : (
              <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {recipeOfTheDay.strMeal && (
                  <div className="flex flex-col items-center">
                    <img
                      src={recipeOfTheDay.strMealThumb}
                      alt={recipeOfTheDay.strMeal}
                      className="w-72 h-72 object-cover rounded-lg shadow-lg transition duration-300 hover:scale-105"
                    />
                    <h3 className="font-semibold text-lg mt-4">{recipeOfTheDay.strMeal}</h3>
                    <Link
                      to={`/recipes/${recipeOfTheDay.idMeal}`}
                      className="bg-[#F23A29] text-white py-2 px-4 rounded-lg mt-4 hover:bg-[#C22A1D] transition duration-300"
                    >
                      View Recipe
                    </Link>
                  </div>
                )}
                {topTrendingDrinks[0] && (
                  <div className="flex flex-col items-center">
                    <img
                      src={topTrendingDrinks[0].strDrinkThumb}
                      alt={topTrendingDrinks[0].strDrink}
                      className="w-72 h-72 object-cover rounded-lg shadow-lg transition duration-300 hover:scale-105"
                    />
                    <h3 className="font-semibold text-lg mt-4">{topTrendingDrinks[0].strDrink}</h3>
                    <Link
                      to={`/drinks/${topTrendingDrinks[0].idDrink}`}
                      className="bg-[#F23A29] text-white py-2 px-4 rounded-lg mt-4 hover:bg-[#C22A1D] transition duration-300"
                    >
                      View Drink
                    </Link>
                  </div>
                )}
                {topRatedRecipes[0] && (
                  <div className="flex flex-col items-center">
                    <img
                      src={topRatedRecipes[0].strMealThumb}
                      alt={topRatedRecipes[0].strMeal}
                      className="w-72 h-72 object-cover rounded-lg shadow-lg transition duration-300 hover:scale-105"
                    />
                    <h3 className="font-semibold text-lg mt-4">{topRatedRecipes[0].strMeal}</h3>
                    <Link
                      to={`/recipes/${topRatedRecipes[0].idMeal}`}
                      className="bg-[#F23A29] text-white py-2 px-4 rounded-lg mt-4 hover:bg-[#C22A1D] transition duration-300"
                    >
                      View Recipe
                    </Link>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Trending Recipes Section */}
          <section className="bg-[#D9D9D9] py-16">
            <h2 className="text-4xl font-bold text-center mb-8 text-black">Trending Recipes</h2>
            {loadingRecipes ? (
              <p className="text-center">Loading trending recipes...</p>
            ) : recipeError ? (
              <p className="text-red-500 text-center">{recipeError}</p>
            ) : (
              <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {trendingRecipes.map((recipe) => (
                  <div key={recipe.idMeal} className="flex flex-col items-center">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-full h-48 object-cover rounded-lg shadow-lg transition duration-300 hover:scale-105"
                    />
                    <h3 className="font-semibold text-lg mt-4">{recipe.strMeal}</h3>
                    <Link
                      to={`/recipes/${recipe.idMeal}`}
                      className="bg-[#F23A29] text-white py-2 px-4 rounded-lg mt-4 hover:bg-[#C22A1D] transition duration-300"
                    >
                      View Recipe
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
