import React, { useState } from 'react';

interface SearchFiltersProps {
  setSearchLocation: (location: string) => void;
  setMaxPrice: (price: number | undefined) => void;
  locations: string[];
  priceRange: { min: number, max: number };
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ setSearchLocation, setMaxPrice, locations, priceRange }) => {
  const [price, setPrice] = useState<number>(priceRange.max);

  return (
    <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="w-full">
        <label className="block text-sm font-medium text-blue-800 mb-1">Location</label>
        <select
          onChange={(e) => setSearchLocation(e.target.value)}
          className="w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-800"
        >
          <option value="">Select City</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-blue-800 mb-1">Price Range: ${price}</label>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          step="100"
          value={price}
          onChange={(e) => {
            setPrice(Number(e.target.value));
            setMaxPrice(Number(e.target.value));
          }}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between text-xs text-blue-800 mt-1">
          <span>${priceRange.min}</span>
          <span>${priceRange.max}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
