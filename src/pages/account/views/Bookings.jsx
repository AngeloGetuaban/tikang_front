import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Modal from '../../../components/Modal';
import { FaRegTimesCircle, FaInfoCircle } from 'react-icons/fa';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('confirmed');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('tikangToken');
        const res = await fetch(`${process.env.REACT_APP_API_URL_GUEST}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data?.bookings) {
          setBookings(data.bookings);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(
    (b) => b.booking_status?.toLowerCase() === activeTab
  );

  const renderBookingCard = (booking) => {
    const bg = booking.thumbnail_url || '/assets/hotel_default.webp';
    return (
      <div
        key={booking.booking_id}
        className="bg-white rounded-lg overflow-hidden shadow border hover:shadow-md transition cursor-pointer"
        onClick={() => setSelectedBooking(booking)}
      >
        <div className="h-40 bg-gray-200">
          <img src={bg} alt={booking.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <h2 className="font-semibold text-lg text-gray-800">{booking.title}</h2>
            <span
              className={`text-xs px-2 py-1 rounded-full font-semibold uppercase ${
                booking.booking_status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : booking.booking_status === 'cancelled'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {booking.booking_status}
            </span>
          </div>
          <p className="text-sm text-gray-500">{booking.address}</p>
          <p className="text-sm text-gray-600">
            {format(new Date(booking.check_in_date), 'MMM dd')} -{' '}
            {format(new Date(booking.check_out_date), 'MMM dd, yyyy')}
          </p>
          <div className="flex justify-between items-center pt-2">
            <p className="text-sm text-gray-700">Rooms: {booking.num_rooms}</p>
            <p className="text-sm font-semibold text-gray-800">
              ₱{Number(booking.total_price).toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between pt-3">
            <button
              className="text-sm text-blue-600 font-semibold hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBooking(booking);
              }}
            >
              View Info
            </button>
            {booking.booking_status === 'confirmed' ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert('Cancel booking logic goes here.');
                }}
                className="text-sm text-red-600 font-semibold hover:underline"
              >
                Cancel
              </button>
            ) : booking.booking_status === 'completed' ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert('Redirect to Review Form');
                }}
                className="text-sm text-green-600 font-semibold hover:underline"
              >
                Review
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  const renderModalContent = (booking) => {
    const isCancelled = booking.booking_status === 'cancelled';
    const Icon = isCancelled ? FaRegTimesCircle : FaInfoCircle;
    const iconColor = isCancelled ? 'text-red-500' : 'text-blue-500';

    return (
      <div className="p-6">
        <div className="flex items-center mb-6 gap-4">
          <Icon className={`w-10 h-10 ${iconColor}`} />
          <div>
            <h2 className="text-xl font-bold">{booking.title}</h2>
            <p className="text-sm text-gray-600">{booking.address}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Check-in:</strong> {format(new Date(booking.check_in_date), 'MMM dd, yyyy')}</p>
          <p><strong>Check-out:</strong> {format(new Date(booking.check_out_date), 'MMM dd, yyyy')}</p>
          {isCancelled && (
            <p><strong>Cancelled Date:</strong> {format(new Date(booking.cancelled_date), 'MMM dd, yyyy')}</p>
          )}
          <p><strong>Guests:</strong> {booking.num_adults} adults, {booking.num_children} children</p>
          <p><strong>Rooms:</strong> {booking.num_rooms}</p>
          <p><strong>Stay Type:</strong> {booking.stay_type}</p>
          <p><strong>Total Price:</strong> ₱{Number(booking.total_price).toFixed(2)}</p>
          <p><strong>Payment Status:</strong> {booking.payment_status}</p>
          <p><strong>Status:</strong> {booking.booking_status}</p>
        </div>

        <div className="mt-4 border-t pt-4">
          <h3 className="text-md font-semibold mb-2">Room Details</h3>
          {booking.rooms?.length > 0 ? (
            <div className="space-y-4">
              {booking.rooms.map((room, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border p-3 rounded-md bg-gray-50"
                >
                  <img
                    src={room.room_images?.[0] || '/assets/room_placeholder.webp'}
                    alt="Room"
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <div className="text-sm text-gray-700">
                    <p><strong>Name:</strong> {room.room_name}</p>
                    <p><strong>Type:</strong> {room.room_type}</p>
                    <p><strong>Price/Night:</strong> ₱{Number(room.price_per_night).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No room data available.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {['confirmed', 'completed', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg font-semibold capitalize transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Booking Content */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredBookings.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No <span className="capitalize">{activeTab}</span> bookings found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map(renderBookingCard)}
        </div>
      )}

      {/* Modal */}
      {selectedBooking && (
        <Modal onClose={() => setSelectedBooking(null)}>
          {renderModalContent(selectedBooking)}
        </Modal>
      )}
    </div>
  );
}
