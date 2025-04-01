import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const TopCitySearch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city') || 'Manila';
  const image = queryParams.get('image') || '/assets/image_1.webp';

  const handleSearch = () => {
    navigate(`/search?city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[80vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold">{city} hotels & places to stay</h1>
          <p className="text-lg mt-2">Search to compare prices and discover great deals with free cancellation</p>

          {/* Search Bar */}
          <div className="mt-6 bg-white rounded-lg shadow-md flex flex-wrap items-center justify-center px-3 py-2 w-full max-w-4xl mx-auto">
            <div className="flex items-center border-r px-4 py-2 w-full sm:w-auto">
              <MdLocationOn className="text-gray-500 mr-2" />
              <input
                type="text"
                defaultValue={city}
                className="text-gray-800 font-medium focus:outline-none w-full"
              />
            </div>
            <div className="flex items-center border-r px-4 py-2 w-full sm:w-auto">
              <FaCalendarAlt className="text-gray-500 mr-2" />
              <span className="text-gray-600 text-sm">Check-in</span>
            </div>
            <div className="flex items-center border-r px-4 py-2 w-full sm:w-auto">
              <FaCalendarAlt className="text-gray-500 mr-2" />
              <span className="text-gray-600 text-sm">Check-out</span>
            </div>
            <div className="flex items-center px-4 py-2 w-full sm:w-auto">
              <FaUser className="text-gray-500 mr-2" />
              <span className="text-gray-600 text-sm">2 adults<br />1 room</span>
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-6 py-2 ml-4 mt-2 sm:mt-0"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TopCitySearch;
