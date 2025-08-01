// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../data/stores/authStore';

const Login = () => {
  const { error, loadig, loginWithEmail } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = new URLSearchParams(location.search).get("redirect") || "/";
  const fallbackRoute = redirectTo === "/payment" ? "/checkout" : "/";

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // 👈 New state for loader

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // 👈 Show loader
    await loginWithEmail(formData.email, formData.password);

    if (!error) {
      navigate(redirectTo);
    }
    setIsSubmitting(false); // 👈 Hide loader after login attempt
  };

  const handleBack = () => {
    navigate(fallbackRoute);
  };

  if (loadig || isSubmitting) // 👈 Show loader when store loading OR submitting
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-16 w-16 mb-4 animate-spin mx-auto"></div>
          <p className="text-gray-600 text-lg">Logging you in...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>

        {/* 👇 Back to Checkout button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleBack}
            className="text-sm text-gray-600 underline hover:text-gray-800"
          >
            ← Back to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
