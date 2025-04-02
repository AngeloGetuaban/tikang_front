import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/Navbar';
import BudgetFilter from './components/BudgetFilter';
import Footer from '../../components/Footer';
import { FaMapMarkerAlt, FaFilter, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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

const sortOptions = ['Best match', 'Top reviewed', 'Lowest price first', 'Distance', 'Hot Deals!'];

const dropdownOptions = {
  'Top reviewed': ['5 stars', '4 stars', '3 stars'],
  'Distance': ['Nearest to city center', 'Nearest to beach', 'Nearest to airport'],
};

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city') || 'Manila';

  const [selectedSort, setSelectedSort] = useState('Best match');
  const [showDropdown, setShowDropdown] = useState(null);

  const handleSortClick = (option) => {
    setSelectedSort(option);
    setShowDropdown(dropdownOptions[option] ? option : null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />

      {/* Search Bar */}
      <div className="mt-20 bg-[#1C2241] px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap sm:flex-nowrap items-center bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="flex-1 flex flex-col justify-center px-4 py-3 border-r border-gray-300">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <FaMapMarkerAlt />
              <span>{city}</span>
            </div>
            <span className="text-xs text-blue-500 ml-6">8,496 choices</span>
          </div>

          <div className="px-4 py-3 border-r border-gray-300">
            <p className="text-xs text-gray-400 font-medium">Check-in</p>
            <p className="text-sm text-gray-800 font-semibold">11 Apr 2025</p>
            <p className="text-xs text-gray-500">Friday</p>
          </div>

          <div className="px-4 py-3 border-r border-gray-300">
            <p className="text-xs text-gray-400 font-medium">Check-out</p>
            <p className="text-sm text-gray-800 font-semibold">12 Apr 2025</p>
            <p className="text-xs text-gray-500">Saturday</p>
          </div>

          <div className="px-4 py-3 border-r border-gray-300">
            <p className="text-xs text-gray-400 font-medium">Guests</p>
            <p className="text-sm text-gray-800 font-semibold">2 adults</p>
            <p className="text-xs text-gray-500">1 room</p>
          </div>

          <div className="px-4 py-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded">
              SEARCH
            </button>
          </div>
        </div>
      </div>

      {/* Top Heading Bar */}
      <div className="bg-[#293D8D] text-white px-6 py-4 flex flex-wrap items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold">Search results for {city}</h2>
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-medium flex items-center gap-1">
            <FaMapMarkerAlt /> Search on Map
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-medium flex items-center gap-1">
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      {/* Sort Options */}
      <div className="max-w-screen-xl mx-auto px-4 mt-6 mb-4">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-sm text-black">Sort by</span>
          <div className="flex flex-wrap border border-gray-300 rounded-full overflow-hidden text-sm shadow-sm">
            {sortOptions.map((option) => (
              <div key={option} className="relative">
                <button
                  onClick={() => handleSortClick(option)}
                  className={`px-4 py-2 border-l border-gray-300 whitespace-nowrap ${
                    selectedSort === option
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  {option} {dropdownOptions[option] && <span className="ml-1">▼</span>}
                </button>

                {showDropdown === option && (
                  <div className="absolute z-10 bg-white shadow rounded mt-1 w-max left-0 top-full">
                    {dropdownOptions[option].map((item, idx) => (
                      <button
                        key={idx}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 w-full text-left"
                        onClick={() => {
                          setShowDropdown(null);
                          console.log(`Selected ${item} from ${option}`);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto p-4 gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-gray-50 p-4 rounded shadow">
          <BudgetFilter />

          {/* Popular Filters */}
          <h3 className="text-lg font-semibold mb-2 mt-6">Popular filters</h3>
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

        {/* Results */}
        <section className="flex-1 space-y-6">
        {dummyResults.map((item, index) => {
          const slug = item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

          return (
            <Link to={`/${slug}`} key={index} className="block hover:shadow-xl transition">
              <div className="bg-white shadow rounded-lg flex flex-col md:flex-row overflow-hidden">
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
            </Link>
          );
        })}
      </section>

      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
