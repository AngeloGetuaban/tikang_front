import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const PlaceDetails = () => {
    const navigate = useNavigate();
    const handleBook = (room) => {
        navigate('/book', { state: { room } });
    };
  const { placeName } = useParams();
  const place = decodeURIComponent(placeName).replace(/-/g, ' ');

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <NavBar />

      <div className="mt-24 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-10">
          {/* Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 rounded overflow-hidden">
            <img src="/assets/image_1.webp" className="col-span-2 h-64 object-cover rounded-md" />
            <img src="/assets/image_2.webp" className="h-64 object-cover rounded-md" />
            <img src="/assets/image_3.webp" className="h-64 object-cover rounded-md" />
            <img src="/assets/image_1.webp" className="h-64 object-cover rounded-md" />
            <img src="/assets/image_2.webp" className="h-64 object-cover rounded-md" />
          </div>

          {/* Title + Price */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold">{place}</h1>
              <p className="text-sm text-gray-500 mt-1">Sr. Street, Malate, Manila</p>
              <p className="text-green-600 font-semibold mt-1">8.2 Excellent • 2,234 reviews</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-sm text-gray-500">from</p>
              <p className="text-2xl font-bold text-red-600">₱1,633</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded mt-2">
                VIEW THIS DEAL
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 text-sm font-medium border-b pb-2">
            {['Overview', 'Rooms', 'Trip recommendations', 'Facilities', 'Reviews', 'Location', 'Policies'].map(tab => (
              <button key={tab} className="hover:text-blue-600 text-gray-600">{tab}</button>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-gray-700">
            Situated in Malate, Manila, Orchid Garden Suites offers travelers a perfect base to explore the city’s vibrant nightlife, historical sites, and scenic Manila Bay. Relax in spacious rooms with a homey ambiance, each featuring a private balcony or terrace and complimentary Wi-Fi. Just 475 meters from Roxas Boulevard and a short walk from Robinsons Place Manila.
          </p>

          {/* Highlights */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Highlights</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
              <div>🚏 530 meters to public transportation</div>
              <div>🍽️ Great food & dining</div>
              <div>🏃‍♂️ Great for activities</div>
              <div>🧼 Hygiene Plus</div>
              <div>🥐 Great breakfast</div>
            </div>
          </div>

          {/* Staycation Offers */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Staycation offers available</h2>
            <p className="text-sm text-gray-600 mb-3">Get special benefits for your stay</p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: '🍴 Food and Drinks', list: ['Room service (24-hour)', 'Coffee shop', 'Bar'] },
                { title: '💆 Wellness', list: ['Spa'] },
                { title: '🏊 Activities', list: ['Swimming Pool', 'Karaoke'] }
              ].map((section, i) => (
                <div key={i} className="border rounded-md p-4 bg-gray-50">
                  <h3 className="font-semibold text-sm mb-2">{section.title}</h3>
                  <ul className="text-sm space-y-1 text-gray-700">
                    {section.list.map((item, idx) => (
                      <li key={idx}>✅ {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Facilities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-700">
              {[
                'Free Wi-Fi', 'Swimming pool', 'Front desk (24-hour)', 'Restaurant',
                'Bar', 'Airport transfer', 'Pool (kids)', 'Kitchenette'
              ].map((facility, i) => (
                <span key={i}>✅ {facility}</span>
              ))}
            </div>
          </div>

          {/* Urgency Banner */}
          <div className="bg-red-100 text-red-700 border border-red-300 rounded px-4 py-3 text-sm font-medium">
            🚨 This property is in high demand! <strong>38 travelers</strong> have booked today.
          </div>

          {/* Map + Locations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-2">📍 Location rating score</h2>
              <p className="text-sm mb-1">⭐ 8.5 Excellent location – 1.44 km from city center</p>
              <p className="text-xs text-green-600 mb-4">Excellent for walking</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold text-sm mb-1">Walkable places</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>🚶 Fo Guang Shan Mabuhay Temple - 200m</li>
                    <li>🚶 Rizal Memorial Coliseum - 230m</li>
                    <li>🚶 Harrison Plaza - 240m</li>
                    <li>🚶 SM Harrison - 360m</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Popular landmarks</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>🏙️ Robinsons Place Manila - 1.9 km</li>
                    <li>🌳 Rizal Park - 2.2 km</li>
                    <li>🐠 Manila Ocean Park - 2.9 km</li>
                    <li>🏛️ National Museum - 3.2 km</li>
                    <li>🏯 Fort Santiago - 3.6 km</li>
                  </ul>
                </div>
              </div>
            </div>

            <iframe
              title="Location Map"
              width="100%"
              height="300"
              className="rounded shadow-md"
              loading="lazy"
              src="https://maps.google.com/maps?q=orchid%20garden%20suites%20manila&t=&z=15&ie=UTF8&iwloc=&output=embed"
            />
          </div>

          {/* Room Selection Section */}
            <div className="mt-16 max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Select your room</h2>

            {/* Room Category Header */}
            <div className="bg-gray-100 px-4 py-3 rounded-t-md border border-b-0 flex justify-between items-center">
                <div className="text-sm font-semibold">
                Standard Queen <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">Popular choice!</span>
                <span className="ml-2 text-xs text-gray-500">Last booked 2 hours ago</span>
                </div>
                <div className="text-sm text-gray-700">Excellent • Room comfort & quality <span className="ml-1 text-blue-600 font-bold">8.9</span></div>
            </div>

            {/* Room Rows */}
            {[1, 2, 3, 4].map((option) => (
                <div key={option} className="grid grid-cols-5 gap-4 border px-4 py-6 items-start text-sm bg-white">
                {/* Room Description */}
                {option === 1 && (
                    <div className="col-span-1 row-span-4 border-r pr-4">
                    <img src="/assets/image_2.webp" className="w-full h-32 object-cover rounded mb-2" />
                    <p className="text-xs text-gray-600 mb-2">
                        Bright room with city views, a sleek workspace, and refreshing touches of blue accent decor.
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                        <li>🛏️ 1 queen bed</li>
                        <li>📏 16 m² / 172 ft²</li>
                        <li>🚭 Non-smoking</li>
                        <li>🚿 Shower</li>
                        <li>🍽️ Kitchenette</li>
                    </ul>
                    <a className="text-xs text-blue-600 hover:underline mt-2 block cursor-pointer">See all room facilities</a>
                    </div>
                )}

                {/* Inclusions */}
                <div className="col-span-2">
                    <div className="mb-1">
                    {option === 1 && (
                        <span className="bg-orange-500 text-white px-2 py-1 text-xs rounded font-semibold">Lowest price available!</span>
                    )}
                    </div>
                    <ul className="space-y-1 text-gray-800">
                    <li>✅ Breakfast {option >= 3 ? 'for 2 – Complimentary' : 'available (₱550 / person)'}</li>
                    {option === 1 || option === 3 ? (
                        <li>❌ Non-refundable (Low price)</li>
                    ) : (
                        <li className="text-green-600">✅ Free cancellation before April 4, 2025</li>
                    )}
                    <li>✅ Book and pay now</li>
                    <li>✅ Parking</li>
                    <li>✅ Free WiFi</li>
                    {option === 2 && <li>✅ Couple Friendly</li>}
                    </ul>
                </div>

                {/* Guests Allowed */}
                <div className="text-xs text-gray-700 text-center">
                    <div className="text-lg">👨‍👩‍👧‍👦</div>
                    <p>1 kid under 13 years stays</p>
                    <p className="text-green-600 font-semibold">FREE!</p>
                </div>

                {/* Price + Deal */}
                <div className="text-right">
                    {option === 1 && (
                    <div className="text-red-600 text-xs mb-1">📌 CHEAPEST PRICE YOU'VE SEEN!</div>
                    )}
                    <p className="text-sm text-gray-500 line-through">₱3,163</p>
                    <p className="text-2xl font-bold text-red-600">
                    ₱{option === 1 ? '1,633' : option === 2 ? '1,635' : option === 3 ? '2,126' : '2,128'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Per night before taxes and fees</p>
                </div>

                {/* Booking Button */}
                <div className="flex flex-col items-end">
                    <button
                    onClick={() => handleBook({
                        name: place,
                        type: 'Standard Queen',
                        price: '₱1,633',
                        size: '16 m²',
                        guests: '2 adults, 1 child',
                        bed: '1 queen bed',
                        wifi: 'Free Wi-Fi',
                        parking: true,
                        refundable: false
                    })}
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded"
                    >
                    Book now
                    </button>
                    <p className="text-green-600 text-xs mt-2">Limited availability</p>
                    {option !== 1 && (
                    <p className="text-green-700 text-xs">NO RISK!<br />No cancellation fee</p>
                    )}
                </div>
                </div>
            ))}
            </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlaceDetails;
