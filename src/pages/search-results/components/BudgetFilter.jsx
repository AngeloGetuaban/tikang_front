import ReactSlider from 'react-slider';
import { useState } from 'react';

const BudgetFilter = () => {
  const [budget, setBudget] = useState([1000, 20000]);

  return (
    <div className="p-4 bg-gray-50 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Your budget (per night)</h3>

      <ReactSlider
        className="horizontal-slider w-full h-2 bg-gray-300 rounded"
        thumbClassName="thumb"
        trackClassName="track"
        min={0}
        max={50000}
        value={budget}
        onChange={(value) => setBudget(value)}
        pearling
        minDistance={1000}
        renderThumb={(props, state) => (
          <div {...props} className="w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-pointer -mt-1">
            {/* optional tooltip: */}
            {/* <span className="text-xs absolute -top-6 left-1/2 transform -translate-x-1/2">{state.valueNow}</span> */}
          </div>
        )}
      />

      <div className="flex justify-between mt-6 text-sm font-medium text-gray-700">
        <div className="text-center">
          <p className="text-gray-500 font-semibold">MIN</p>
          <div className="mt-1 border px-3 py-1 rounded w-24 text-center">₱{budget[0].toLocaleString()}</div>
        </div>
        <div className="text-center">
          <p className="text-gray-500 font-semibold">MAX</p>
          <div className="mt-1 border px-3 py-1 rounded w-24 text-center">₱{budget[1].toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default BudgetFilter;
