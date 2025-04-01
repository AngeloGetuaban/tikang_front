import React, { useState } from 'react';
import Place from '../../../components/Place';
import tabData from '../../../data/recommendedHomesData'; // ✅ Ensure correct path

export default function RecommendedHomes() {
  const tabs = Object.keys(tabData);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedHome, setSelectedHome] = useState(null);

  return (
    <section className="bg-[#3A6EA5] py-12 px-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">
            Featured homes recommended for you
          </h2>
          <a href="#" className="text-white text-sm underline hover:text-blue-100">
            See more ({activeTab}) properties →
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6 text-sm border-b border-blue-100 text-white">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 border-b-2 transition-all duration-200 ${
                activeTab === tab
                  ? 'border-white text-white font-semibold'
                  : 'border-transparent text-blue-100 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(tabData[activeTab] || []).map((home, i) => (
            <div
              key={i}
              onClick={() => setSelectedHome(home)}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-200 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={home.image}
                  alt={home.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  {home.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {home.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{home.location}</p>
                <p className="text-xs text-gray-400">Per night before taxes</p>
                <p className="text-sm font-bold text-red-500 mt-1">
                  {home.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Place Details */}
      {selectedHome && (
        <Place home={selectedHome} onClose={() => setSelectedHome(null)} />
      )}
    </section>
  );
}
