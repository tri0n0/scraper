import React, { useState } from 'react';
import axios from 'axios';
import { Car, Shield } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { InsuranceCard } from './components/InsuranceCard';
import { InsuranceTable } from './components/InsuranceTable';
import { ViewToggle } from './components/ViewToggle';
import type { InsuranceDetails } from './types/insurance';
import { INSURANCE_COMPANIES } from './data/mockInsuranceData';
import {
  generateRandomPrice,
  generateRandomCoverage,
  generateRandomAddOns,
  generateRandomClaimSettlement,
  formatCurrency
} from './utils/insuranceUtils';

function App() {
  const [carNumber, setCarNumber] = useState('');
  const [insuranceDetails, setInsuranceDetails] = useState<InsuranceDetails[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'table'>('grid');

  const handleSearch = async () => {
    if (!carNumber.trim()) {
      setError('Please enter a valid car number');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Generate comprehensive mock data
      const mockData = INSURANCE_COMPANIES.map(company => {
        const basePrice = generateRandomPrice();
        const coverage = generateRandomCoverage();
        
        return {
          company: company.name,
          price: formatCurrency(basePrice),
          rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
          features: generateRandomAddOns(),
          coverage: coverage,
          deductible: Math.floor(basePrice * 0.05), // 5% of base price
          monthlyOption: formatCurrency(Math.floor(basePrice / 12)),
          claimSettlement: generateRandomClaimSettlement(),
          addOns: generateRandomAddOns(),
          yearlyDiscount: Math.floor(Math.random() * 15) + 10 // 10-25% discount
        };
      }).sort((a, b) => 
        parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''))
      );

      setInsuranceDetails(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch insurance details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-12 h-12 text-indigo-600" />
            <Car className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Car Insurance Finder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare quotes from top insurance providers in seconds
          </p>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mb-12">
          <SearchBar
            value={carNumber}
            onChange={setCarNumber}
            onSearch={handleSearch}
            loading={loading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Results Section */}
        {insuranceDetails && (
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Found {insuranceDetails.length} Insurance Quotes
              </h2>
              <p className="text-gray-600">
                Compare and choose the best insurance plan for your vehicle
              </p>
            </div>
            <ViewToggle view={view} onViewChange={setView} />
            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {insuranceDetails.map((details, index) => (
                  <InsuranceCard key={index} details={details} />
                ))}
              </div>
            ) : (
              <InsuranceTable details={insuranceDetails} />
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !insuranceDetails && !error && (
          <div className="text-center text-gray-500 mt-12">
            Enter your car number above to see available insurance options
          </div>
        )}
      </div>
    </div>
  );
}

export default App;