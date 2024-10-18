import React, { useState } from 'react';
import food1 from '../assets/hero5.jpg'; 
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');   
    setMessage(''); 
  
    try {
      // Create user account with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user's display name (optional)
      await user.updateProfile({ displayName: name });

      // Send verification email
      await sendEmailVerification(user);
      setMessage('A verification email has been sent to your email address. Please verify to continue.');

      // Clear form inputs after successful registration
      setName('');
      setEmail('');
      setPassword('');

      // Optionally redirect after sending the verification email
      // navigate('/verify-email');  // Uncomment if you want to navigate

    } catch (error) {
      // Set the error message from Firebase
      setError(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#D9D9D9]">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="hidden md:block md:w-1/2">
          <img src={food1} alt="Delicious Food" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#F23A29]">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {message && <p className="text-green-600 mb-4">{message}</p>}
            <div className="mb-4">
              <label className="block text-sm font-medium text-black" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
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
                className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                placeholder="Create a password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#F23A29] text-white font-bold py-2 rounded-md hover:bg-[#e02e22] transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-black">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#F23A29] hover:text-[#e02e22] font-medium">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
