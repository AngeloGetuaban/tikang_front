import React, { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TopCitiesSection = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [topCities, setTopCities] = useState([]);

  const updateArrowVisibility = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(el.scrollLeft + el.offsetWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateArrowVisibility();
    el.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);

    return () => {
      el.removeEventListener('scroll', updateArrowVisibility);
      window.removeEventListener('resize', updateArrowVisibility);
    };
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_API_URL_PROPERTIES);
        const properties = await res.json();

        // Group by city and count
        const cityMap = new Map();
        for (const property of properties) {
          const city = property.city;
          if (!cityMap.has(city)) {
            cityMap.set(city, {
              name: city,
              count: 1,
              image: property.thumbnail_url,
            });
          } else {
            cityMap.get(city).count += 1;
          }
        }

        const sortedCities = Array.from(cityMap.values())
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        setTopCities(sortedCities);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="mt-16 px-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Top Cities in the Philippines
      </h2>

      <div className="relative group max-w-screen-xl mx-auto">
        {showLeftArrow && (
          <button
            onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })}
            className="group-hover:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
          >
            <FaChevronLeft className="text-gray-700 w-5 h-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar pb-2 px-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {topCities.map((city, index) => (
            <Link
              to={`/top-city-search?city=${encodeURIComponent(city.name)}&image=${encodeURIComponent(city.image)}`}
              key={index}
            >
              <div className="w-[20%] min-w-[200px] flex-shrink-0 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition duration-200 snap-start">
                <img src={city.image} alt={city.name} className="w-full h-32 object-cover rounded-t-lg" />
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-gray-800">{city.name}</h3>
                  <p className="text-sm text-gray-500">{city.count} accommodations</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
            className="group-hover:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
          >
            <FaChevronRight className="text-gray-700 w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopCitiesSection;
