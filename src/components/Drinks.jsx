import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heartIcon from '../assets/heart.png'; // Adjust the path to your heart icon
import './Drinks.css'; // Import the CSS file for custom styles

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [previousQuery, setPreviousQuery] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteDrinks, setFavoriteDrinks] = useState([]); // State for favorite drinks
  const drinksPerPage = 16;

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
        if (!response.ok) {
          throw new Error('Failed to fetch drinks');
        }
        const data = await response.json();
        setDrinks(data.drinks);
        setFilteredDrinks(data.drinks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  useEffect(() => {
    const filtered = drinks.filter((drink) =>
      drink.strDrink.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDrinks(filtered);
    setCurrentPage(1);
  }, [searchQuery, drinks]);

  const handlePreviousSearch = () => {
    setSearchQuery(previousQuery);
  };

  const indexOfLastDrink = currentPage * drinksPerPage;
  const indexOfFirstDrink = indexOfLastDrink - drinksPerPage;
  const currentDrinks = filteredDrinks.slice(indexOfFirstDrink, indexOfLastDrink);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredDrinks.length / drinksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchButtonClick = () => {
    setPreviousQuery(searchQuery);
  };

  // Function to toggle favorite drinks
  const handleFavoriteToggle = (idDrink) => {
    setFavoriteDrinks((prevFavorites) => {
      if (prevFavorites.includes(idDrink)) {
        return prevFavorites.filter((drinkId) => drinkId !== idDrink);
      } else {
        return [...prevFavorites, idDrink];
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-16 px-4 lg:px-8 bg-[#D9D9D9]">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#F23A29]">Drinks</h1>

      {/* Search Bar for Real-Time Filtering */}
      <div className="flex justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search for a drink..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg shadow-lg border focus:outline-none focus:ring-2 focus:ring-[#F23A29] text-black"
        />
        <button
          onClick={handleSearchButtonClick}
          className="ml-2 bg-[#F23A29] text-white px-4 py-2 rounded-lg hover:bg-[#e02e22] transition-colors duration-300"
        >
          Search
        </button>
      </div>

      {/* Previous Search Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handlePreviousSearch}
          disabled={!previousQuery}
          className={`text-black px-4 py-2 rounded-lg ${!previousQuery ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#F23A29] hover:text-white transition-colors'}`}
        >
          Previous Search
        </button>
      </div>

      {/* Display Drinks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentDrinks.map((drink) => (
          <div key={drink.idDrink} className="bg-white shadow-lg rounded-lg overflow-hidden drink-card relative">
            <button
              onClick={() => handleFavoriteToggle(drink.idDrink)}
              className="absolute top-4 right-4 focus:outline-none"
            >
              <img
                src={heartIcon}
                alt="Favorite"
                className={`w-6 h-6 transition duration-300 ${favoriteDrinks.includes(drink.idDrink) ? 'opacity-100' : 'opacity-50'}`}
              />
            </button>
            <img src={drink.strDrinkThumb} alt={drink.strDrink} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-6 text-black">{drink.strDrink}</h3>
              <Link
                to={`/drinks/${drink.idDrink}`}
                className="bg-[#F23A29] text-white py-2 px-4 rounded-lg hover:bg-[#e02e22] transition-colors duration-300"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`text-black px-4 py-2 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#F23A29] hover:text-white transition-colors'}`}
        >
          ← Previous
        </button>
        <span className="text-black">Page {currentPage} of {Math.ceil(filteredDrinks.length / drinksPerPage)}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(filteredDrinks.length / drinksPerPage)}
          className={`text-black px-4 py-2 rounded-lg ${currentPage === Math.ceil(filteredDrinks.length / drinksPerPage) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#F23A29] hover:text-white transition-colors'}`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Drinks;
