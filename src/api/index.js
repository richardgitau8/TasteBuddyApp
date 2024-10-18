import axios from 'axios';

const BASE_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';


export const fetchRecipes = async (searchTerm = '') => {
  try {
    // Fetch food recipes
    const foodResponse = await axios.get(`${BASE_MEAL_URL}search.php?s=${searchTerm}`);
    const foodData = foodResponse.data;

    // Fetch drink recipes
    const drinkResponse = await axios.get(`${BASE_DRINK_URL}search.php?s=${searchTerm}`);
    const drinkData = drinkResponse.data;

    console.log("API call made to:", `${BASE_MEAL_URL}search.php?s=${searchTerm}`);
    console.log("API call made to:", `${BASE_DRINK_URL}search.php?s=${searchTerm}`);

    // Check for food and drink data
    if (!foodData.meals && !drinkData.drinks) {
      throw new Error('No recipes found for this search term.');
    }

    // Return combined results
    return {
      meals: foodData.meals || [],
      drinks: drinkData.drinks || [],
    };
  } catch (error) {
    console.error("Error fetching recipes:", error.message);

    // catch and throw error message
    throw new Error('No recipes Found. Please try again.');
  }
};
