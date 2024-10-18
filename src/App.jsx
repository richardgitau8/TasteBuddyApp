// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import HomePage from './components/HomePage'; 
import { fetchRecipes } from './api';
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    setError('');  
    try {
      const data = await fetchRecipes(query);
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]); // No recipes found
        setError('No recipes found.');
      }
    } catch (error) {
      setError('An error occurred while fetching recipes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Routes>
        {/* Main route for HomePage */}
        <Route path="*" element={<HomePage 
          onSearch={handleSearch} // Pass handleSearch function
          recipes={recipes} // Pass recipes to HomePage
          loading={loading} // Pass loading state
          error={error} // Pass error state
        />} />
        
        {/* Other routes for RecipeList */}
        <Route path="/recipes" element={<RecipeList recipes={recipes} error={error} />} />
      </Routes>
    </div>
  );
};

export default App;
