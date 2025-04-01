import React, { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TopCitiesSection = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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

  const cities = [
    { name: 'Manila', image: '/assets/image_1.webp', accommodations: '13,223' },
    { name: 'Cebu', image: '/assets/image_2.webp', accommodations: '5,254' },
    { name: 'Boracay Island', image: '/assets/image_3.webp', accommodations: '1,038' },
    { name: 'Baguio', image: '/assets/image_4.webp', accommodations: '1,944' },
    { name: 'Palawan', image: '/assets/image_5.webp', accommodations: '1,863' },
    { name: 'Davao', image: '/assets/image_1.webp', accommodations: '2,509' },
    { name: 'Iloilo', image: '/assets/image_2.webp', accommodations: '980' },
    { name: 'Bohol', image: '/assets/image_3.webp', accommodations: '1,112' },
    { name: 'Tagaytay', image: '/assets/image_4.webp', accommodations: '2,310' },
    { name: 'Vigan', image: '/assets/image_5.webp', accommodations: '1,005' },
  ];

  return (
    <div className="mt-16 px-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Top Cities in the Philippines
      </h2>

      <div className="relative group max-w-screen-xl mx-auto">
        {showLeftArrow && (
          <button
            onClick={() =>
              scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
            }
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
          {cities.map((city, index) => (
            <Link
            to={`/top-city-search?city=${encodeURIComponent(city.name)}&image=${encodeURIComponent(city.image)}`}
            key={index}
            >
            <div className="w-[20%] min-w-[200px] flex-shrink-0 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition duration-200 snap-start">
                <img src={city.image} alt={city.name} className="w-full h-32 object-cover rounded-t-lg" />
                <div className="p-3 text-center">
                <h3 className="font-semibold text-gray-800">{city.name}</h3>
                <p className="text-sm text-gray-500">{city.accommodations} accommodations</p>
                </div>
            </div>
            </Link>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() =>
              scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
            }
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
