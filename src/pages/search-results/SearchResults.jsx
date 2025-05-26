import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { isBefore, isAfter } from 'date-fns';
import NavBar from '../../components/Navbar';
import BudgetFilter from './components/BudgetFilter';
import Footer from '../../components/Footer';
import { FaMapMarkerAlt, FaFilter, FaHeart, FaUsers } from 'react-icons/fa';

const PROPERTY_TYPES = ['Hotel', 'Apartment', 'Guesthouse', 'Resort'];

const SearchResults = () => {
  const location = useLocation();
  const searchParams = location.state || {};
  const {
    destination = '',
    checkIn,
    checkOut,
    stayType,
    adults = 2,
    children = 0,
    rooms = 1,
  } = searchParams;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [budgetRange, setBudgetRange] = useState([1000, 20000]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString('en-PH', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          weekday: 'short',
        })
      : 'N/A';

  const isRoomAvailable = (roomId, bookings, checkIn, checkOut, totalRoomCount) => {
    const overlappingBookings = bookings.filter(
      (b) =>
        b.room_id?.includes(roomId) &&
        b.booking_status === 'confirmed' &&
        !b.cancelled_date &&
        !(new Date(checkOut) <= new Date(b.check_in_date) || new Date(checkIn) >= new Date(b.check_out_date))
    );
    return totalRoomCount - overlappingBookings.length;
  };

  const getDiscount = (roomId, discounts) => {
    const today = new Date();
    return discounts.find(
      (d) =>
        d.is_active &&
        d.rooms?.includes(roomId) &&
        new Date(d.valid_from) <= today &&
        new Date(d.valid_until) >= today
    );
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [propsRes, roomsRes, bookingsRes, discountsRes] = await Promise.all([
          axios.get(process.env.REACT_APP_API_URL_PROPERTIES),
          axios.get(process.env.REACT_APP_API_URL_ROOMS),
          axios.get(process.env.REACT_APP_API_URL_BOOKINGS),
          axios.get(process.env.REACT_APP_API_URL_DISCOUNTS),
        ]);

        const properties = propsRes.data;
        const allRooms = roomsRes.data;
        const bookings = bookingsRes.data;
        const discounts = discountsRes.data;

        const filtered = properties
          .filter((p) => p.city.toLowerCase().includes(destination.toLowerCase()))
          .map((prop) => {
            const propRooms = allRooms.filter((r) => r.property_id === prop.property_id);
            const availableRooms = propRooms
              .map((room) => {
                const availableCount = isRoomAvailable(
                  room.room_id,
                  bookings,
                  checkIn,
                  checkOut,
                  room.total_rooms
                );
                const discount = getDiscount(room.room_id, discounts);
                const discountedPrice = discount
                  ? (parseFloat(room.price_per_night) * (1 - discount.discount_percent / 100)).toFixed(2)
                  : null;

                const price = discountedPrice || parseFloat(room.price_per_night);

                return {
                  ...room,
                  availableCount,
                  discountPercent: discount?.discount_percent || 0,
                  discountedPrice,
                  price,
                };
              })
              .filter(
                (room) =>
                  room.availableCount >= rooms &&
                  room.price >= budgetRange[0] &&
                  room.price <= budgetRange[1]
              );

            return availableRooms.length > 0 &&
              (selectedTypes.length === 0 || selectedTypes.includes(prop.type))
              ? { ...prop, availableRooms }
              : null;
          })
          .filter(Boolean);

        setResults(filtered);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [destination, checkIn, checkOut, rooms, budgetRange, selectedTypes]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

      {/* Header */}
      <div className="mt-20 bg-[#1C2241] text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span className="font-semibold text-lg">{destination}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span>Check-in: <strong>{formatDate(checkIn)}</strong></span>
            <span>Check-out: <strong>{formatDate(checkOut)}</strong></span>
            <span>
              <strong>{adults}</strong> adult{adults !== 1 ? 's' : ''},{' '}
              <strong>{children}</strong> child{children !== 1 ? 'ren' : ''},{' '}
              <strong>{rooms}</strong> room{rooms !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-grow max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 min-h-[600px]">
          {/* Sidebar */}
          <aside className="bg-white rounded-lg p-4 shadow h-fit sticky top-24 self-start">
          <BudgetFilter
            budget={budgetRange}
            setBudget={setBudgetRange}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
          />
          </aside>

          {/* Results */}
          <section className="space-y-8">
            {loading ? (
              <div className="text-center text-gray-500 py-20">Loading...</div>
            ) : results.length === 0 ? (
              <div className="text-center text-gray-500 text-lg font-medium mt-20">
                No available properties found.
              </div>
            ) : (
              results.map((prop, i) => (
                <div key={i} className="bg-white shadow rounded-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{prop.title}</h3>
                      <p className="text-sm text-blue-600">{prop.address}</p>
                    </div>
                    <FaHeart className="text-gray-300 hover:text-red-500 cursor-pointer mt-1" />
                  </div>

                  {/* Rooms */}
                  {prop.availableRooms.map((room, r) => (
                    <div key={r} className="border-t px-4 py-5 flex flex-col md:flex-row gap-4 bg-gray-50">
                      <div className="md:w-1/4 w-full">
                      {room.room_images && room.room_images.length > 0 ? (
                          <img
                            src={`${process.env.REACT_APP_API_URL}${room.room_images[0]}`} // Ensure it's the full URL
                            alt={room.room_name}
                            className="w-full h-40 object-cover rounded-lg border"
                          />
                        ) : (
                          <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="md:w-3/4 flex flex-col justify-between">
                        <div className="mb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800">{room.room_name}</h4>
                              <p className="text-sm text-gray-600">{room.room_type}</p>
                              <p className="text-xs text-gray-500 mt-1 mb-2 break-words whitespace-normal">
                                {room.description}
                              </p>
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <FaUsers className="inline-block text-gray-400" /> Max Guests: {room.max_guests}
                              </p>
                            </div>
                            <div className="text-right">
                              {room.discountedPrice && (
                                <p className="text-xs text-red-500 line-through">
                                  ₱{parseFloat(room.price_per_night).toFixed(2)}
                                </p>
                              )}
                              <p className="text-xl font-bold text-green-700">
                                ₱{room.discountedPrice || parseFloat(room.price_per_night).toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">{room.availableCount} room(s) left</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {room.amenities?.map((a, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
