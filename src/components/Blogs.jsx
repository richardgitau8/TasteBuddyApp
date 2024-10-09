// src/components/Blogs.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import hero3 from '../assets/hero3.jpg';
import hero4 from '../assets/hero4.jpg';
import hero5 from '../assets/hero5.jpg';
import hero6 from '../assets/hero6.jpg';

const blogs = [
  {
    title: 'Blog Post 1',
    image: hero3,
    description: 'Explore our latest food trends and delicious recipes.',
    link: '/blog-post-1',
  },
  {
    title: 'Blog Post 2',
    image: hero4,
    description: 'Discover tips and tricks for perfecting your cooking skills.',
    link: '/blog-post-2',
  },
  {
    title: 'Blog Post 3',
    image: hero5,
    description: 'Dive into the world of gourmet recipes and unique flavors.',
    link: '/blog-post-3',
  },
  {
    title: 'Blog Post 4',
    image: hero6,
    description: 'Learn about health-conscious cooking and meal prep ideas.',
    link: '/blog-post-4',
  },
];

const Blogs = () => {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-12">Welcome to Our Blog</h1>
      <p className="text-center mb-8">Discover the latest food trends, recipes, and cooking tips from our blog.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-700 mb-4">{blog.description}</p>
              <Link to={blog.link} className="bg-[#F23A29] text-white py-2 px-4 rounded-lg hover:bg-[#C22A1D]">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
