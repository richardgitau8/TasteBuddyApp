import React, { useState } from 'react';
import food2 from '../assets/food2.png';
import { Link, useNavigate } from 'react-router-dom';
// Commenting out Firebase imports
// import { auth, googleProvider } from '../firebase'; // Firebase setup
// import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    // Disable sign-in logic for testing
    try {
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;

      // Check email verification status
      // if (user.emailVerified) {
      //   navigate('/'); // Redirect to homepage on successful sign-in
      // } else {
      //   setError('Please verify your email before signing in.');
      // }
      setMessage('Sign-in simulated successfully.'); // Simulate success message
    } catch (err) {
      // Show specific Firebase error message
      setError(err.message || 'Invalid email or password. Please try again.');
      console.error('Sign-in error:', err);
    }
  };

  // Handle Google sign-in (disabled for testing)
  const handleGoogleSignIn = async () => {
    setError(''); // Clear any previous errors
    // Disable Google sign-in logic for testing
    try {
      // const result = await signInWithPopup(auth, googleProvider);
      // const user = result.user;

      // Check email verification status
      // if (user.emailVerified) {
      //   navigate('/');
      // } else {
      //   setError('Please verify your email before signing in.');
      // }
      setMessage('Google sign-in simulated successfully.'); // Simulate success message
    } catch (err) {
      // Show specific Firebase error message
      if (err.code === 'auth/popup-closed-by-user') {
        setError('The sign-in popup was closed before completing the sign-in process. Please try again.');
      } else {
        setError(err.message || 'Google sign-in failed. Please try again.');
      }
      console.error('Google sign-in error:', err);
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

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600 transition duration-200"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>

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
