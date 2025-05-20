import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';

const PROPERTY_TYPES = ['Hotel', 'Apartment', 'Guesthouse', 'Resort'];

const BudgetFilter = ({ budget, setBudget, selectedTypes, setSelectedTypes }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCollapsed(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="transition-all duration-300 ease-in-out bg-white rounded-lg p-4 shadow h-fit">
      {!isCollapsed ? (
        <>
          {/* Expanded View */}
          <h3 className="font-semibold text-gray-800 mb-4">Your Budget (per night)</h3>

          <ReactSlider
            className="horizontal-slider w-full h-2 bg-gray-300 rounded"
            thumbClassName="thumb"
            trackClassName="track"
            min={0}
            max={50000}
            value={budget}
            onChange={setBudget}
            pearling
            minDistance={1000}
            renderThumb={(props) => (
              <div
                {...props}
                className="w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-pointer -mt-1"
              />
            )}
          />

          <div className="flex justify-between mt-6 text-sm font-medium text-gray-700">
            <div className="text-center">
              <p className="text-gray-500 font-semibold">MIN</p>
              <div className="mt-1 border px-3 py-1 rounded w-24 text-center">
                ₱{budget[0].toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-500 font-semibold">MAX</p>
              <div className="mt-1 border px-3 py-1 rounded w-24 text-center">
                ₱{budget[1].toLocaleString()}
              </div>
            </div>
          </div>

          <h2 className="font-semibold text-gray-800 mt-8 mb-2">Property Type</h2>
          {PROPERTY_TYPES.map((type) => (
            <label key={type} className="block mb-2 text-sm">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedTypes.includes(type)}
                onChange={() =>
                  setSelectedTypes((prev) =>
                    prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
                  )
                }
              />
              {type}
            </label>
          ))}
        </>
      ) : (
        <>
          {/* Collapsed View */}
          <div className="mb-4 text-sm font-medium text-gray-800">
            Budget: ₱{budget[0].toLocaleString()} - ₱{budget[1].toLocaleString()}
          </div>
          <h2 className="font-semibold text-gray-800 mb-2">Property Type</h2>
          {PROPERTY_TYPES.filter((type) => selectedTypes.includes(type)).map((type) => (
            <label key={type} className="block mb-2 text-sm">
              <input
                type="checkbox"
                className="mr-2"
                checked
                onChange={() =>
                  setSelectedTypes((prev) =>
                    prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
                  )
                }
              />
              {type}
            </label>
          ))}
          {selectedTypes.length === 0 && (
            <p className="text-sm text-gray-400 italic">No property types selected</p>
          )}
        </>
      )}
    </div>
  );
};

export default BudgetFilter;
