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
import { format } from 'date-fns';

export default function NavBar() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);

  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const displayDate =
    startDate && endDate
      ? `${format(startDate, 'MMM d')} – ${format(endDate, 'MMM d')}`
      : 'Anytime';

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-[#D4EDDA] shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Tikang Logo" className="h-10 w-auto object-contain" />
          <span className="text-lg font-bold text-gray-800"></span>
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

        {/* Mobile Buttons (Only <640px) */}
        <div className="sm:hidden flex items-center gap-4 ml-auto">
        {/* Search Icon */}
        <button
            className="text-2xl text-gray-700"
            onClick={() => setSearchPopupOpen(true)}
        >
            <FaSearch />
        </button>

        {/* Hamburger Icon */}
        <button
            className="text-2xl text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
            <FaBars />
        </button>
        </div>

        {/* Desktop Nav Links (≥1024px) */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/owner" className="hover:text-green-600">List your Property</Link>
          <Link to="#" className="hover:text-green-600">Favorites</Link>

          <div className="relative group">
            <Link to="#" className="hover:text-green-600 text-xl">
              <FaShoppingCart />
            </Link>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Cart
            </div>
          </div>

          <div className="relative group">
            <Link to="/login" className="hover:text-green-600 text-xl">
              <FaUserCircle />
            </Link>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Profile
            </div>
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
          <Link to="#" onClick={() => setMobileMenuOpen(false)}>Rent a Place</Link>
          <Link to="#" onClick={() => setMobileMenuOpen(false)}>Favorites</Link>
          <Link to="#" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
            <FaShoppingCart /> Cart
          </Link>
          <Link to="#" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
            <FaUserCircle /> Profile
          </Link>
        </div>
      </div>

      {/* Mobile Search Popup Overlay */}
      {searchPopupOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Search</span>
            <FaTimes
              className="text-2xl cursor-pointer"
              onClick={() => setSearchPopupOpen(false)}
            />
          </div>

          {/* Search Field */}
          <input
            type="text"
            placeholder="Search for a place"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 text-sm"
          />

          {/* Calendar Picker */}
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

          {/* Search Button */}
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