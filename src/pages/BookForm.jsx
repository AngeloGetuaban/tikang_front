// src/pages/BookForm.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const BookForm = () => {
  const { state } = useLocation();
  const room = state?.room;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* Booking Steps Navbar */}
    <div className="bg-white border-b px-6 py-3 flex justify-center items-center gap-10 shadow-sm">

    {/* Logo */}
    <div className="flex items-center gap-2">
        <img src="/assets/logo.png" alt="Tikang Logo" className="h-6" />
    </div>

    {/* Steps Progress */}
    <div className="flex items-center gap-6 text-sm text-gray-700 font-medium">
        {/* Step 1 */}
        <div className="flex items-center gap-1">
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs">1</div>
        <span className="text-blue-600">Customer information</span>
        </div>
        <div className="w-6 h-px bg-gray-300" />

        {/* Step 2 */}
        <div className="flex items-center gap-1 text-gray-500">
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-400 text-white text-xs">2</div>
        <span>Payment information</span>
        </div>
        <div className="w-6 h-px bg-gray-300" />  

        {/* Step 3 */}
        <div className="flex items-center gap-1 text-gray-500">
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-400 text-white text-xs">✓</div>
        <span>Booking is confirmed!</span>
        </div>
    </div>

    {/* Sign In */}
    <button className="ml-8 border border-blue-600 text-blue-600 text-sm px-4 py-1 rounded-full hover:bg-blue-50 whitespace-nowrap">
        Sign in
    </button>
    </div>

      {/* Timer */}
      <div className="bg-red-50 text-red-600 font-semibold py-2 text-center text-sm border-b">
        We are holding your price... <span className="ml-2">⏱ 00:18:57</span>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto w-full mt-6 px-4 gap-6">
        {/* Form */}
        <div className="flex-1 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Who’s the lead guest?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="First name *" className="border p-2 rounded w-full" />
            <input type="text" placeholder="Last name *" className="border p-2 rounded w-full" />
          </div>
          <input type="email" placeholder="Email *" className="border p-2 rounded w-full mt-4" />
          <input type="text" placeholder="Phone number (optional)" className="border p-2 rounded w-full mt-4" />

          <div className="mt-8">
            <h3 className="font-semibold mb-2">Special requests</h3>
            <p className="text-sm text-gray-600 mb-2">Select your preferences. Subject to availability.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block mb-1">Which type of room?</label>
                <label><input type="radio" name="smoke" /> Non-smoking</label><br />
                <label><input type="radio" name="smoke" /> Smoking</label>
              </div>
              <div>
                <label className="block mb-1">Which bed setup?</label>
                <label><input type="radio" name="bed" /> I'd like a large bed</label><br />
                <label><input type="radio" name="bed" /> I'd like twin beds</label>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700">
            NEXT: FINAL STEP
          </button>
          <p className="text-xs text-center text-green-600 mt-2">You won’t be charged yet.</p>
        </div>

        {/* Booking Summary */}
        <div className="bg-white p-6 rounded shadow w-full lg:w-1/3">
          <img src="/assets/image_1.webp" alt="room" className="rounded mb-4" />
          <div className="text-sm text-gray-800 font-semibold">{room?.name || 'Orchid Garden Suites'}</div>
          <p className="text-xs text-gray-600">🛏️ {room?.type} • {room?.size}</p>
          <p className="text-xs text-gray-600">👤 {room?.guests}</p>
          <p className="text-xs text-gray-600">🚘 {room?.parking ? 'Parking included' : 'No parking'}</p>
          <p className="text-xs text-gray-600">📶 {room?.wifi}</p>
          <p className="text-sm text-red-600 font-bold mt-4">{room?.price}</p>
          <p className="text-xs text-green-600">Extra low price! {room?.refundable ? 'Free cancellation' : 'Non-refundable'}</p>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
