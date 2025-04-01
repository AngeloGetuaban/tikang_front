import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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

export default function CarouselSection() {
  return (
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
              <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">
                {slide.text}
              </h2>
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
  );
}
