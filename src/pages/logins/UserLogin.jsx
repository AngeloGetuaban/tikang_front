import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/Navbar';
import WarningPopup from '../../components/WarningPopup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const API_BASE = process.env.REACT_APP_API_URL_GUEST;

export default function UserLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = `${API_BASE ?? ''}/${isSignup ? 'register' : 'login'}`;

    const payload = isSignup
      ? {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.password,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data;
      const isJson = res.headers.get('content-type')?.includes('application/json');

      if (isJson) {
        data = await res.json();
      } else {
        throw new Error('Invalid response from server. Please try again.');
      }

      if (!res.ok) {
        if (res.status === 400) {
          throw new Error(data?.message || 'Missing required fields');
        }
        if (res.status === 401) {
          throw new Error('Invalid email or password');
        }
        throw new Error(data?.message || 'Something went wrong');
      }

      console.log('Success:', data);
      login(data.token);
      setTimeout(() => navigate('/'), 0); // redirect to home
      // TODO: Store token and redirect
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      {error && <WarningPopup message={error} onClose={() => setError('')} />}

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-lg rounded-xl flex w-full max-w-5xl overflow-hidden">
          {/* Left - Logo and Slogan */}
          <div className="hidden md:flex flex-col items-center justify-center bg-[#71a3d9] text-white p-10 w-1/2">
            <img src="/assets/logo.png" alt="Tikang Logo" className="w-40 mb-2" />
            <h2 className="text-xl font-bold mb-1 text-center">Find places that feel like home</h2>
            <p className="text-sm text-center">
              Your trusted rental platform for local and long stays in the Philippines.
            </p>
          </div>

          {/* Right - Login / Signup Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {isSignup ? 'Create Your Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {isSignup ? 'Sign up to start using Tikang' : 'Login to your Tikang account'}
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {isSignup && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
              >
                {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Log In'}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              By {isSignup ? 'signing up' : 'logging in'}, I agree to Tikang's{' '}
              <Link to="#" className="text-blue-600 hover:underline">Terms of Use</Link> and{' '}
              <Link to="#" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>

            <p className="text-sm text-gray-600 text-center mt-4">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-600 font-medium hover:underline"
              >
                {isSignup ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
