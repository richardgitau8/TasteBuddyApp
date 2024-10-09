import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import hamburgerIcon from '../assets/menu.png';
import userIcon from '../assets/user.png'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Toggle the dropdown on click
  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Close the dropdown if clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, []);

  return (
    <header className="relative bg-[#D9D9D9] shadow-md pt-6 pb-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <div className="w-28 h-28">
          <img src={logo} alt="RecipeShare Logo" className="w-full h-full object-contain" />
        </div>

        {/* Desktop View - Navigation Links and User Icon */}
        <nav className="hidden md:flex items-center space-x-8 text-black text-lg">
          <Link to="/" className="hover:text-[#F23A29]">Home</Link>
          <Link to="/drinks" className="hover:text-[#F23A29]">Drinks</Link>
          <Link to="/trending-recipes" className="hover:text-[#F23A29]">Trending Recipes</Link>
          <Link to="/blogs" className="hover:text-[#F23A29]">Blogs</Link>
          <Link to="/contact" className="hover:text-[#F23A29]">Contact Us</Link>

          {/* User Icon and Dropdown */}
          <div className="relative profile-dropdown">
            <img
              src={userIcon}
              alt="User Icon"
              className="w-8 h-8 cursor-pointer"
              onClick={handleProfileClick}
            />

            {/* Dropdown menu on click */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-40 py-2 text-center">
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-[#F23A29] hover:text-white transition">
                  Profile
                </Link>
                <Link to="/signin" className="block px-4 py-2 text-gray-700 hover:bg-[#F23A29] hover:text-white transition">Sign In</Link>
                <Link to="/signup" className="block px-4 py-2 text-gray-700 hover:bg-[#F23A29] hover:text-white transition">Sign Up</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Hamburger Icon for Mobile/Tablets */}
        <div className="md:hidden">
          <img
            src={hamburgerIcon}
            alt="Menu"
            className="w-8 h-8 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>

      {/* Dropdown Menu for Mobile/Tablets */}
      {isMenuOpen && (
        <nav className="flex flex-col items-center w-full mt-4 md:hidden text-black">
          <Link to="/" className="hover:text-[#F23A29] py-2">Home</Link>
          <Link to="/drinks" className="hover:text-[#F23A29] py-2">Drinks</Link>
          <Link to="/trending-recipes" className="hover:text-[#F23A29] py-2">Trending Recipes</Link>
          <Link to="/blogs" className="hover:text-[#F23A29] py-2">Blogs</Link>
          <Link to="/contact" className="hover:text-[#F23A29] py-2">Contact Us</Link>

          {/* Profile extended dropdown */}
          <div className="w-full text-center">
            <button
              onClick={handleProfileClick}
              className="w-full text-gray-700 py-2 hover:text-[#F23A29] focus:outline-none"
            >
              Profile
            </button>
            {isProfileDropdownOpen && (
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-full py-2">
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-[#F23A29] hover:text-white transition">
                  Profile
                </Link>
                <Link to="/signin" className="block px-4 py-2 text-gray-700 hover:bg-[#F23A29] hover:text-white transition">Sign In</Link>
                <Link to="/signup" className="block px-4 py-2 text-gray-700 hover:bg-[#F23A29] hover:text-white transition">Sign Up</Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
