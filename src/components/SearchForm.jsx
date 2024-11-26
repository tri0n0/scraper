import React from 'react';
import { Search } from 'lucide-react';

export const SearchForm = ({ carNumber, setCarNumber, handleSearch, loading }) => (
  <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
    <div className="relative">
      <input
        type="text"
        value={carNumber}
        onChange={(e) => setCarNumber(e.target.value)}
        placeholder="Enter car number (e.g., ABC123XYZ)"
        className="input-primary"
        pattern="[A-Za-z0-9]{9}"
        title="Please enter a 9-character alphanumeric car number"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center space-x-2"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <Search className="w-5 h-5" />
        )}
        <span>{loading ? 'Searching...' : 'Search'}</span>
      </button>
    </div>
  </form>
);