// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowLeft, UserPlus } from "lucide-react";
import { useAuthStore } from "../../data/stores/authStore";

// Robot illustration (can replace with your own)
const RoboIllustration = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
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

const Login = () => {
  const { loginWithEmail, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = new URLSearchParams(location.search).get("redirect") || "/";
  const fallbackRoute = redirectTo === "/payment" ? "/checkout" : "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null); // ✅ local error state

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // ✅ clear old error

    try {
      await loginWithEmail(formData.email, formData.password);
      navigate(redirectTo);
    } catch (err) {
      // ✅ handle login error locally
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(fallbackRoute);
  };

  if (loading || isSubmitting) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <Loader2 className="animate-spin h-14 w-14 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-700 text-lg font-medium">Logging you in...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-6">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Illustration Side */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center"
        >
          <RoboIllustration />
          <h3 className="mt-6 text-xl font-bold text-gray-700 text-center">
            Powering Your Robotics Journey
          </h3>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Login to access your account and shop high-quality robotic components.
          </p>
        </motion.div>

        {/* Form Side */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 text-red-600 text-sm p-2 rounded-md"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition duration-300"
            >
              {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : <span>Login</span>}
            </motion.button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium inline-flex items-center">
              <UserPlus className="w-4 h-4 mr-1" /> Sign up
            </Link>
          </p>

          <div className="mt-6 text-center">
            <motion.button
              whileHover={{ x: -4 }}
              onClick={handleBack}
              className="text-sm text-gray-600 underline hover:text-gray-800 flex items-center justify-center mx-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Checkout
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
  