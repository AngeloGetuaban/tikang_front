import React, { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DiscountsSection = () => {
  const discountRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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

  const offers = [
    { image: '/assets/image_1.webp', title: '30% Off Manila Hotels', valid: 'Valid until Apr 30' },
    { image: '/assets/image_2.webp', title: '20% Off Cebu Studios', valid: 'Valid until May 15' },
    { image: '/assets/image_3.webp', title: 'Rent 5 Days, Get 2 Free', valid: 'Valid until May 10' },
    { image: '/assets/image_4.webp', title: 'Home Rentals Starting ₱999', valid: 'Valid until Apr 25' },
    { image: '/assets/image_5.webp', title: 'Boracay Villas at 40% Off', valid: 'Valid until May 5' },
    { image: '/assets/image_1.webp', title: 'Tagaytay Getaways Deal', valid: 'Valid until Apr 28' },
    { image: '/assets/image_2.webp', title: 'Iloilo Condo Sale', valid: 'Valid until May 20' },
    { image: '/assets/image_3.webp', title: '3 Nights for Price of 2', valid: 'Valid until May 30' },
    { image: '/assets/image_4.webp', title: 'Early Bird Discounts', valid: 'Valid until Apr 27' },
    { image: '/assets/image_5.webp', title: '10% Off for New Users', valid: 'Valid until May 12' },
  ];

  return (
    <div className="mt-20 px-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Best Discounts For You
      </h2>

      <div className="relative group max-w-screen-xl mx-auto">
        {showLeftArrow && (
          <button
            onClick={() =>
              discountRef.current.scrollBy({ left: -300, behavior: 'smooth' })
            }
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
          {offers.map((offer, index) => (
            <div
              key={index}
              className="w-[20%] min-w-[200px] flex-shrink-0 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition duration-200 snap-start"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-3 text-center">
                <h3 className="font-semibold text-gray-800 text-sm">{offer.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{offer.valid}</p>
              </div>
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() =>
              discountRef.current.scrollBy({ left: 300, behavior: 'smooth' })
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

export default DiscountsSection;
