import React, { useState, useEffect } from 'react';
import Place from '../../../components/Place';
import hotelImage from '../../../assets/hotel_default.webp';

export default function RecommendedHomes() {
  const [properties, setProperties] = useState([]);
  const [groupedByCity, setGroupedByCity] = useState({});
  const [topCities, setTopCities] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [selectedHome, setSelectedHome] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_API_URL_PROPERTIES);
        const data = await res.json();

        // Group properties by city
        const cityGroups = {};
        for (const property of data) {
          if (!property.city) continue;
          if (!cityGroups[property.city]) {
            cityGroups[property.city] = [];
          }
          cityGroups[property.city].push(property);
        }

        // Get top 10 cities with the most properties
        const sortedCities = Object.entries(cityGroups)
          .sort((a, b) => b[1].length - a[1].length)
          .slice(0, 10);

        const topCityNames = sortedCities.map(([city]) => city);
        const grouped = Object.fromEntries(sortedCities);

        setTopCities(topCityNames);
        setGroupedByCity(grouped);
        setActiveTab(topCityNames[0] || '');
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="bg-[#3A6EA5] py-12 px-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">
            Featured homes recommended for you
          </h2>
          <a href="#" className="text-white text-sm underline hover:text-blue-100">
            See more ({activeTab}) properties →
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6 text-sm border-b border-blue-100 text-white overflow-x-auto">
          {topCities.map((city) => (
            <button
              key={city}
              onClick={() => setActiveTab(city)}
              className={`pb-2 border-b-2 whitespace-nowrap transition-all duration-200 ${
                activeTab === city
                  ? 'border-white text-white font-semibold'
                  : 'border-transparent text-blue-100 hover:text-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(groupedByCity[activeTab] || []).map((home, i) => (
            <div
              key={i}
              onClick={() => setSelectedHome(home)}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-200 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={home.thumbnail_url}
                  alt={home.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = hotelImage;
                  }}
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  ★ {home.rating || '4.5'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {home.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{home.city}</p>
                <p className="text-xs text-gray-400">Per night before taxes</p>
                <p className="text-sm font-bold text-red-500 mt-1">
                  ₱{parseFloat(home.price_per_night).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Place Details */}
      {selectedHome && (
        <Place home={selectedHome} onClose={() => setSelectedHome(null)} />
      )}
    </section>
  );
}
