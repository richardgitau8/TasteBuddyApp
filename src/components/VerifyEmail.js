// src/components/VerifyEmail.js
import React, { useEffect, useState } from 'react';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  // Send verification email
  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setEmailSent(true);
      } catch (err) {
        setError('Failed to send verification email. Please try again.');
      }
    }
  };

  useEffect(() => {
    sendVerificationEmail();
  }, []);

  const handleContinue = () => {
    navigate('/'); // Redirect to homepage or login
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        {emailSent ? (
          <p className="mb-4 text-green-600">A verification email has been sent. Please check your inbox and verify your email before continuing.</p>
        ) : (
          <p className="mb-4 text-red-600">{error || 'Sending verification email...'}</p>
        )}

        <button
          onClick={handleContinue}
          className="bg-[#F23A29] text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
