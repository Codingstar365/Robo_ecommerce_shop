// src/pages/SignUp.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useAuthStore } from "../../data/stores/authStore";
import userStore from "../../data/stores/userStore";

// Simple Robot Illustration SVG
const RoboIllustration = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    className="w-48 h-48 mx-auto"
  >
    <circle cx="100" cy="100" r="80" fill="#E6F0FA" />
    <rect x="70" y="70" width="60" height="60" rx="10" fill="#2563EB" />
    <circle cx="85" cy="100" r="8" fill="white" />
    <circle cx="115" cy="100" r="8" fill="white" />
    <rect x="80" y="120" width="40" height="8" rx="4" fill="white" />
    <rect x="92" y="48" width="16" height="20" rx="3" fill="#2563EB" />
    <rect x="20" y="95" width="20" height="8" rx="2" fill="#2563EB" />
    <rect x="160" y="95" width="20" height="8" rx="2" fill="#2563EB" />
  </svg>
);

// 🔹 Map Firebase errors → user-friendly messages
const getErrorMessage = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    default:
      return "Something went wrong. Please try again.";
  }
};

const SignUp = () => {
  const navigate = useNavigate();
  const { signupWithEmail } = useAuthStore();
  const { createUser } = userStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loadingUI, setLoadingUI] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null); // local error
  useAuthStore.setState({ error: null }); // ✅ clear global error

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  try {
    setLoadingUI(true);
    await signupWithEmail(formData.email, formData.password, formData.name);
    await createUser({
      name: formData.name,
      email: formData.email,
      createdAt: new Date().toISOString(),
    });

    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
  } catch (e) {
    setError(e.message);
  } finally {
    setLoadingUI(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-6 relative">
      {/* Loading Overlay */}
      {loadingUI && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
        >
          <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
          <p className="mt-4 text-blue-700 font-semibold text-lg">
            Creating your account...
          </p>
        </motion.div>
      )}

      {/* Success Overlay */}
      {success && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
        >
          <CheckCircle className="text-green-600 h-12 w-12 mb-3" />
          <p className="text-green-700 font-bold text-xl">
            Account created successfully!
          </p>
          <p className="text-sm text-gray-600 mt-1">Redirecting...</p>
        </motion.div>
      )}

      {/* Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10"
      >
        {/* Illustration */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center"
        >
          <RoboIllustration />
          <h3 className="mt-6 text-xl font-bold text-gray-700 text-center">
            Build Your Robotics Future
          </h3>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Sign up to start shopping high-quality robotic components and kits.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Create an Account
          </h2>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg flex items-center mb-4"
            >
              <XCircle className="w-5 h-5 mr-2 text-red-600" />
              <span>{error}</span>
            </motion.div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                placeholder="Your name"
                onChange={handleChange}
                autoComplete="name"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </motion.button>
          </form>

          <p className="mt-6 text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
