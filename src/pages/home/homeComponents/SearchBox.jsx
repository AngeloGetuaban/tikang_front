import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();

  const [stayType, setStayType] = useState("overnight");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(addDays(new Date(), 1));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(2);
  const [roomCount, setRoomCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [activeTab, setActiveTab] = useState("calendar");
  const [stayLength, setStayLength] = useState("1 week");
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    navigate('/search', {
      state: {
        stayType,
        checkIn,
        checkOut,
        adults: adultCount,
        children: childCount,
        rooms: roomCount,
        stayLength,
        selectedMonths,
        destination,
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md mt-6 px-6 py-6 relative z-10">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setStayType("overnight")}
          className={`px-4 py-2 border font-medium rounded-full ${
            stayType === "overnight"
              ? "border-blue-500 text-blue-600"
              : "border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Overnight Stays
        </button>
        <button
          onClick={() => setStayType("dayuse")}
          className={`px-4 py-2 border font-medium rounded-full ${
            stayType === "dayuse"
              ? "border-blue-500 text-blue-600"
              : "border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Day Use Stays
        </button>
      </div>

      {stayType === "dayuse" && (
        <div className="text-sm text-pink-600 mb-4 flex items-start gap-2">
          <span className="text-lg">🏨</span>
          <p>
            <strong>Day Use Stays</strong> are inexpensive, 4–12 hour room rentals that are not overnight.
            Your check-in and check-out will be on the same date.
          </p>
        </div>
      )}

      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white">
        <span className="text-gray-400 mr-3 text-lg">🔍</span>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter a destination or property"
          className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
        />
      </div>

      <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4 relative">
        <div
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-white cursor-pointer"
        >
          <div className="text-sm text-gray-700 font-medium">
            {checkIn.toDateString()}
          </div>
          <div className="text-xs text-gray-500">
            {stayType === "dayuse" ? "Same day checkout" : "Check-in"}
          </div>
        </div>

        {stayType === "overnight" && (
          <div
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-white cursor-pointer"
          >
            <div className="text-sm text-gray-700 font-medium">
              {checkOut.toDateString()}
            </div>
            <div className="text-xs text-gray-500">Check-out</div>
          </div>
        )}

        <div
          onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-white flex items-center justify-between relative cursor-pointer"
        >
          <div className="flex items-center gap-2 text-sm">
            <span className="text-xl">👥</span>
            <span className="text-gray-700 font-medium">{adultCount} adult{adultCount > 1 ? "s" : ""}</span>
            <span className="text-gray-500">{roomCount} room{roomCount > 1 ? "s" : ""}</span>
          </div>
          <span className="text-gray-400 text-sm">▼</span>

          {guestDropdownOpen && (
            <div className="absolute top-[110%] right-0 w-72 bg-white rounded-xl shadow-xl p-4 z-50 text-sm">
              {[
                { label: "Room", count: roomCount, set: setRoomCount, min: 1 },
                { label: "Adults", sub: "Ages 18 or above", count: adultCount, set: setAdultCount, min: 1 },
                { label: "Children", sub: "Ages 0–17", count: childCount, set: setChildCount, min: 0 },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2">
                  <div>
                    <div className="font-medium text-gray-800">{item.label}</div>
                    {item.sub && <div className="text-xs text-gray-500">{item.sub}</div>}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        item.set((prev) => Math.max(item.min, prev - 1));
                      }}
                      className="border border-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-black"
                    >
                      −
                    </button>
                    <span>{item.count}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        item.set((prev) => prev + 1);
                      }}
                      className="border border-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-black"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isCalendarOpen && (
          <div className="absolute top-[110%] left-0 bg-white rounded-xl shadow-xl p-6 z-50 w-full md:w-[650px]">
            <div className="flex gap-6 text-sm font-medium text-gray-600 border-b w-full pb-2 mb-4">
              <button
                onClick={() => setActiveTab("calendar")}
                className={`pb-1 ${activeTab === "calendar" ? "text-blue-600 border-b-2 border-blue-600" : ""}`}
              >
                Calendar
              </button>
              <button
                onClick={() => setActiveTab("flexible")}
                className={`pb-1 ${activeTab === "flexible" ? "text-blue-600 border-b-2 border-blue-600" : ""}`}
              >
                I’m flexible
              </button>
            </div>

            {activeTab === "calendar" ? (
              <DatePicker
                selected={checkIn}
                onChange={(date) => {
                  if (stayType === "dayuse") {
                    setCheckIn(date);
                    setCheckOut(date);
                  } else {
                    const [start, end] = date;
                    setCheckIn(start);
                    setCheckOut(end);
                  }
                }}
                startDate={checkIn}
                endDate={stayType === "overnight" ? checkOut : checkIn}
                selectsRange={stayType === "overnight"}
                inline
                monthsShown={2}
                minDate={new Date()}
              />
            ) : (
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-gray-700 font-semibold mb-2">How long do you want to stay?</h3>
                  <div className="flex gap-3">
                    {["3 nights", "1 week", "1 month"].map(option => (
                      <button
                        key={option}
                        onClick={() => setStayLength(option)}
                        className={`px-4 py-1 rounded-full border ${
                          stayLength === option
                            ? "bg-blue-100 text-blue-600 border-blue-500"
                            : "text-gray-700 border-gray-300"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-700 font-semibold mb-2">When do you want to travel?</h3>
                  <div className="flex overflow-x-auto gap-4 pb-2">
                    {[
                      "March 2025", "April 2025", "May 2025", "June 2025",
                      "July 2025", "August 2025", "September 2025",
                      "October 2025", "November 2025", "December 2025"
                    ].map(month => (
                      <button
                        key={month}
                        onClick={() =>
                          setSelectedMonths(prev =>
                            prev.includes(month)
                              ? prev.filter(m => m !== month)
                              : [...prev, month]
                          )
                        }
                        className={`min-w-[100px] border px-4 py-2 rounded-lg text-sm text-center ${
                          selectedMonths.includes(month)
                            ? "border-blue-500 text-blue-600"
                            : "border-gray-300 text-gray-600"
                        }`}
                      >
                        <div className="text-lg">📅</div>
                        {month}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => {
                      setStayLength("1 week");
                      setSelectedMonths([]);
                    }}
                    className="text-blue-600 font-medium text-sm"
                  >
                    Clear
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2 rounded-lg"
                    onClick={() => setIsCalendarOpen(false)}
                  >
                    Select
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search Button */}
      <div className="text-center">
        <button
          onClick={handleSearch}
          className="bg-[#3A78F2] hover:bg-[#3167d3] text-white font-semibold text-lg px-10 py-3 rounded-xl shadow-md transition"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
