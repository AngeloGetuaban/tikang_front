import React, { useState } from 'react';
import {
  FaSearch,
  FaCalendarAlt,
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);

  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-[#D4EDDA] shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Tikang Logo" className="h-10 w-auto object-contain" />
        </div>

        {/* Search Bar (Desktop Only ≥640px) */}
        <div className="hidden sm:flex flex-1 max-w-2xl mx-6">
          <div className="flex items-center w-full bg-[#F0F0F0] rounded-full px-4 py-2 gap-3">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for a place"
              className="bg-transparent outline-none w-full text-sm"
            />
            <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
              <FaCalendarAlt className="text-gray-500" />
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleChange}
                minDate={new Date()}
                placeholderText="Anytime"
                className="bg-transparent text-sm text-gray-700 outline-none w-28 cursor-pointer"
                dateFormat="MMM d"
              />
            </div>
            <button className="ml-3 bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
              Search
            </button>
          </div>
        </div>

        {/* Mobile Buttons */}
        <div className="sm:hidden flex items-center gap-4 ml-auto">
          <button className="text-2xl text-gray-700" onClick={() => setSearchPopupOpen(true)}>
            <FaSearch />
          </button>
          <button className="text-2xl text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <FaBars />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/owner" className="hover:text-green-600">List your Property</Link>
          <Link to="#" className="hover:text-green-600">Favorites</Link>

          {/* Cart Hover */}
          <div className="relative group">
            <Link to="#" className="hover:text-green-600 text-xl">
              <FaShoppingCart />
            </Link>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Cart
            </div>
          </div>

          {/* Profile / User Dropdown */}
          <div className="relative group">
            {user ? (
              <>
                <button className="hover:text-green-600 font-semibold text-sm">
                  Welcome, {user?.full_name?.split(' ')[0] || 'User'}
                </button>
                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded shadow-md w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  <Link to="/account/information" className="block px-4 py-2 hover:bg-gray-100 text-sm">My Account</Link>
                  <Link to="/account/bookings" className="block px-4 py-2 hover:bg-gray-100 text-sm">Bookings</Link>
                  <Link to="/account/messages" className="block px-4 py-2 hover:bg-gray-100 text-sm">Messages</Link>
                  <Link to="/account/tikangcash" className="block px-4 py-2 hover:bg-gray-100 text-sm">TikangCash</Link>
                  <Link to="/account/reviews" className="block px-4 py-2 hover:bg-gray-100 text-sm">Reviews</Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-green-600 text-xl">
                  <FaUserCircle />
                </Link>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Profile
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-bold">Menu</span>
          <FaTimes
            className="text-xl cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
        <div className="flex flex-col p-4 text-gray-700 gap-4 text-sm font-medium">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/owner" onClick={() => setMobileMenuOpen(false)}>List Your Property</Link>
          <Link to="#" onClick={() => setMobileMenuOpen(false)}>Favorites</Link>
          <Link to="#" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
            <FaShoppingCart /> Cart
          </Link>
          {user ? (
            <>
              <Link to="/account/information" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
              <Link to="/account/bookings" onClick={() => setMobileMenuOpen(false)}>Bookings</Link>
              <Link to="/account/messages" onClick={() => setMobileMenuOpen(false)}>Messages</Link>
              <Link to="/account/tikangcash" onClick={() => setMobileMenuOpen(false)}>TikangCash</Link>
              <Link to="/account/reviews" onClick={() => setMobileMenuOpen(false)}>Reviews</Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-left text-red-600">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
              <FaUserCircle /> Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search Popup */}
      {searchPopupOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Search</span>
            <FaTimes className="text-2xl cursor-pointer" onClick={() => setSearchPopupOpen(false)} />
          </div>
          <input
            type="text"
            placeholder="Search for a place"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 text-sm"
          />
          <div className="flex items-center gap-2 mb-4">
            <FaCalendarAlt className="text-gray-500" />
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={handleChange}
              minDate={new Date()}
              placeholderText="Anytime"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              dateFormat="MMM d"
            />
          </div>
          <button
            onClick={() => setSearchPopupOpen(false)}
            className="bg-blue-500 text-white py-2 rounded-md text-sm font-semibold"
          >
            Search
          </button>
        </div>
      )}
    </>
  );
}
