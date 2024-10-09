import React from 'react';
import { Link } from 'react-router-dom';
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import twitterIcon from '../assets/twitter.png';
import youtubeIcon from '../assets/youtube.png';
import linkedinIcon from '../assets/linkedin.png';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* About Us Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              Discover a world of delicious recipes and drinks. Explore, cook, and share your favorite meals!
            </p>
          </div>

          {/* Categories Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul>
              <li className="mb-2">
                <Link to="/appetizers" className="text-gray-400 hover:text-[#F23A29]">Appetizers</Link>
              </li>
              <li className="mb-2">
                <Link to="/main-dishes" className="text-gray-400 hover:text-[#F23A29]">Main Dishes</Link>
              </li>
              <li className="mb-2">
                <Link to="/desserts" className="text-gray-400 hover:text-[#F23A29]">Desserts</Link>
              </li>
              <li className="mb-2">
                <Link to="/drinks" className="text-gray-400 hover:text-[#F23A29]">Drinks</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link to="/about" className="text-gray-400 hover:text-[#F23A29]">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-gray-400 hover:text-[#F23A29]">Contact</Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-gray-400 hover:text-[#F23A29]">Privacy Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-gray-400 hover:text-[#F23A29]">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://web.facebook.com/Rickcraftedbrands" target="_blank" rel="noreferrer" className="flex items-center">
                <img src={facebookIcon} alt="Facebook" className="w-8 h-8 transition-transform duration-300 hover:scale-110" />
              </a>
              <a href="https://www.instagram.com/rickcraftedbrand/" target="_blank" rel="noreferrer" className="flex items-center">
                <img src={instagramIcon} alt="Instagram" className="w-8 h-8 transition-transform duration-300 hover:scale-110" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="flex items-center">
                <img src={twitterIcon} alt="Twitter" className="w-8 h-8 transition-transform duration-300 hover:scale-110" />
              </a>
              <a href="https://www.youtube.com/@rickcrafted" target="_blank" rel="noreferrer" className="flex items-center">
                <img src={youtubeIcon} alt="YouTube" className="w-8 h-8 transition-transform duration-300 hover:scale-110" />
              </a>
              <a href="https://www.linkedin.com/in/richard-chege08/" target="_blank" rel="noreferrer" className="flex items-center">
                <img src={linkedinIcon} alt="LinkedIn" className="w-8 h-8 transition-transform duration-300 hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Taste Buddy. Created by Richard. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
