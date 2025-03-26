import React, { useRef, useState, useEffect } from 'react';
import NavBar from '../../components/Navbar';
import { Carousel } from 'react-responsive-carousel';
import './Home.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Home() {
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
      
        updateArrowVisibility(); // check on load
        el.addEventListener('scroll', updateArrowVisibility);
        window.addEventListener('resize', updateArrowVisibility);
      
        return () => {
          el.removeEventListener('scroll', updateArrowVisibility);
          window.removeEventListener('resize', updateArrowVisibility);
        };
      }, []);

  const slides = [
    {
      image: 'image_1.webp',
      text: 'Discover Cozy Homes',
      button: 'See Recommendation',
    },
    {
      image: 'image_2.webp',
      text: 'Become a Lessor',
      button: 'Rent Your Own Place',
    },
    {
      image: 'image_3.webp',
      text: 'Learn About Tikang',
      button: 'About Tikang',
    },
    {
      image: 'image_4.webp',
      text: 'Stay Like a Local',
      button: 'Find A Place',
    },
    {
      image: 'image_5.webp',
      text: 'Big Offers Await!',
      button: 'View Discounted Offers',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      <NavBar />
      <div className="mt-20">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative">
              <img
                src={`/assets/${slide.image}`}
                alt={`Slide ${index + 1}`}
                className="h-[60vh] w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">{slide.text}</h2>
                {slide.button && (
                  <button className="bg-[#3A6EA5] hover:bg-[#325e8a] transition duration-200 text-white text-lg px-8 py-3 rounded-full font-semibold shadow-md">
                    {slide.button}
                  </button>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
        {/* Top Cities Scroll Section */}
        <div className="mt-16 px-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Top Cities in the Philippines
        </h2>

        <div className="relative group max-w-screen-xl mx-auto">
            {/* Left Arrow */}
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

            {/* Scrollable container */}
            <div
            ref={scrollRef}
            id="city-scroll"
            className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar pb-2 px-2"
            style={{ scrollSnapType: 'x mandatory' }}
            >
            {[
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
            ].map((city, index) => (
                <div
                key={index}
                className="w-[20%] min-w-[200px] flex-shrink-0 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition duration-200 snap-start"
                >
                <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-3 text-center">
                    <h3 className="font-semibold text-gray-800">{city.name}</h3>
                    <p className="text-sm text-gray-500">
                    {city.accommodations} accommodations
                    </p>
                </div>
                </div>
            ))}
            </div>

            {/* Right Arrow */}
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
    </div>
  );
}

export default Home;
