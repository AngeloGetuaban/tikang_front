import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaMapMarkerAlt, FaFilter, FaHeart } from 'react-icons/fa';

const dummyResults = [
  {
    name: 'Valero Grand Suites by Swiss-Belhotel',
    location: 'Makati, Manila - City center',
    rating: '8.6 Excellent',
    reviews: '7,237 reviews',
    priceBefore: '₱10,000',
    priceAfter: '₱2,555',
    discount: '74%',
    image: '/assets/image_1.webp',
    tags: ['Breakfast', 'Free fitness center access', 'Free WiFi'],
  },
  {
    name: 'One Pacific Place Serviced Residences',
    location: 'Makati, Manila - City center',
    rating: '8.7 Excellent',
    reviews: '9,049 reviews',
    priceBefore: '₱1,921',
    priceAfter: '₱1,856',
    discount: '3%',
    image: '/assets/image_2.webp',
    tags: ['Breakfast', 'Welcome drink', 'Parking'],
  },
  {
    name: 'The Mini Suites at Eton Tower Makati',
    location: 'Makati, Manila - City center',
    rating: '8.2 Excellent',
    reviews: '22,892 reviews',
    priceBefore: '₱2,500',
    priceAfter: '₱1,944',
    discount: '22%',
    image: '/assets/image_3.webp',
    tags: ['Free cancellation', 'Internet', 'Breakfast included'],
  },
];
const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city') || 'Manila';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />

      {/* Filters & Heading */}
      <div className="bg-blue-900 text-white py-4 px-6 flex flex-wrap items-center justify-between">
        <h2 className="text-xl font-semibold">Search results for {city}</h2>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <button className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded text-sm">
            <FaMapMarkerAlt className="inline mr-1" />
            Search on Map
          </button>
          <button className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded text-sm">
            <FaFilter className="inline mr-1" />
            Filters
          </button>
        </div>
      </div>

      {/* Listings */}
      <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto p-4 gap-6">
        {/* Left Sidebar */}
        <aside className="w-full md:w-1/4 bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Your budget (per night)</h3>
          <input type="range" className="w-full mb-4" min={0} max={10000} />

          <h3 className="text-lg font-semibold mb-2">Popular filters</h3>
          {['Breakfast included', 'Internet access', 'Book without credit card'].map((filter, idx) => (
            <label key={idx} className="block mb-2">
              <input type="checkbox" className="mr-2" />
              {filter}
            </label>
          ))}

          <h3 className="text-lg font-semibold mt-6 mb-2">Property type</h3>
          {['Hotel', 'Apartment', 'Guesthouse', 'Resort'].map((type, idx) => (
            <label key={idx} className="block mb-2">
              <input type="checkbox" className="mr-2" />
              {type}
            </label>
          ))}
        </aside>

        {/* Main Listings */}
        <section className="flex-1 space-y-6">
          {dummyResults.map((item, index) => (
            <div key={index} className="bg-white shadow rounded-lg flex flex-col md:flex-row overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full md:w-60 h-48 object-cover" />
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-blue-700">{item.location}</p>
                    <div className="flex flex-wrap mt-2 gap-2">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer mt-1" />
                </div>
              </div>
              <div className="bg-blue-50 px-4 py-2 md:w-52 flex flex-col justify-center items-end">
                <p className="text-blue-700 font-semibold text-sm">{item.rating}</p>
                <p className="text-xs text-gray-500">{item.reviews}</p>
                <p className="text-xs text-red-600 mt-2 line-through">{item.priceBefore}</p>
                <p className="text-lg font-bold text-green-700">{item.priceAfter}</p>
                <p className="text-xs text-green-600">+ FREE CANCELLATION</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
