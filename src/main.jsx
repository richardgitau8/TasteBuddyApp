// Main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import RegistrationForm from './components/RegistrationForm';
import SignInForm from './components/SignInForm';
import RecipeDetail from './components/RecipeDetail';

import './index.css';
import FavoritesList from './components/FavoritesList';
import ContactUs from './components/ContactUs';
import TrendingRecipes from './components/TrendingRecipes';
import Blogs from './components/Blogs';
import Drinks from './components/Drinks';
import DrinkDetail from './components/DrinkDetail';
import Profile from './components/Profile'; 
import '@fortawesome/fontawesome-free/css/all.min.css';


const Main = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<FavoritesList />} />
        
      
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/trending-recipes" element={<TrendingRecipes />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/drinks/:id" element={<DrinkDetail />} />
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
      <Footer />
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
