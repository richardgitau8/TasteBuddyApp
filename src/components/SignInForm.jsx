import React, { useState } from 'react';
import food2 from '../assets/food2.png';
import { Link, useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    
    if (email === 'test@example.com' && password === 'password') {
      navigate('/'); // Redirect to homepage on successful sign-in
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#D9D9D9]">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img src={food2} alt="Delicious Food" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#F23A29]">Sign In to Your Account</h2>
          
          {error && <p className="text-red-500 text-center">{error}</p>} {/* Error message */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F23A29] transition duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F23A29] transition duration-200"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#F23A29] text-white font-bold py-2 rounded-md hover:bg-[#e02e22] transition duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-black">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#F23A29] hover:text-[#e02e22] font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
