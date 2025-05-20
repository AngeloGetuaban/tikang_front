import React, { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import hotelImage from '../../../assets/hotel_default.webp';

const DiscountsSection = () => {
  const discountRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeDiscounts, setActiveDiscounts] = useState([]);

  const updateArrowVisibility = () => {
    const el = discountRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(el.scrollLeft + el.offsetWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = discountRef.current;
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
    const fetchDiscountsAndProperties = async () => {
      try {
        const [discountRes, propertyRes] = await Promise.all([
          fetch(process.env.REACT_APP_API_URL_DISCOUNTS),
          fetch(process.env.REACT_APP_API_URL_PROPERTIES),
        ]);
        const [discounts, properties] = await Promise.all([
          discountRes.json(),
          propertyRes.json(),
        ]);

        const now = new Date();

        const propertyMap = new Map();
        for (const property of properties) {
          propertyMap.set(property.property_id, property);
        }

        const validDiscounts = discounts
          .filter(discount => new Date(discount.valid_until) >= now)
          .sort((a, b) => new Date(a.valid_until) - new Date(b.valid_until))
          .map(discount => {
            const property = propertyMap.get(discount.property_id);
            if (
              !property ||
              !property.thumbnail_url ||
              property.thumbnail_url.includes('placekitten') ||
              property.thumbnail_url.includes('placeimg')
            ) {
              return null;
            }

            return {
              id: discount.discount_id,
              image: property.thumbnail_url,
              title: discount.description,
              city: `${property.title} - ${property.city}`,
              valid: `Valid until ${new Date(discount.valid_until).toLocaleDateString('en-PH', {
                month: 'short',
                day: 'numeric',
              })}`,
            };
          })
          .filter(Boolean);

        setActiveDiscounts(validDiscounts);
      } catch (error) {
        console.error('Failed to load discounts or properties:', error);
      }
    };

    fetchDiscountsAndProperties();
  }, []);

  return (
    <div className="mt-20 px-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Best Discounts For You
      </h2>

      <div className="relative group max-w-screen-xl mx-auto">
        {showLeftArrow && (
          <button
            onClick={() => discountRef.current.scrollBy({ left: -300, behavior: 'smooth' })}
            className="group-hover:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
          >
            <FaChevronLeft className="text-gray-700 w-5 h-5" />
          </button>
        )}

        <div
          ref={discountRef}
          className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar pb-2 px-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {activeDiscounts.map((offer, index) => (
            <div
              key={index}
              className="w-[20%] min-w-[200px] flex-shrink-0 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition duration-200 snap-start"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-32 object-cover rounded-t-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = hotelImage;
                }}
              />
              <div className="p-3 text-center">
                <h3 className="font-semibold text-gray-800 text-sm">{offer.title}</h3>
                <p className="text-xs text-gray-500">{offer.city}</p>
                <p className="text-xs text-gray-500 mt-1">{offer.valid}</p>
              </div>
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => discountRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
            className="group-hover:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
          >
            <FaChevronRight className="text-gray-700 w-5 h-5" />
          </button>
        )}
      </div>

      {activeDiscounts.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No active discounts available at the moment.
        </div>
      )}
    </div>
  );
};

export default DiscountsSection;
