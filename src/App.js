import React, { useState } from 'react';
import './App.css';

const INSURANCE_COMPANIES = [
  'SafeGuard Plus',
  'AutoProtect Elite',
  'SecureWheel Pro',
  'DriveShield Max',
  'PrimeGuard Auto',
  'VehicleCare Pro',
  'RoadSafe Elite',
  'AutoAssure Plus',
  'CarShield Premium',
  'TotalCover Pro'
];

const FEATURES = [
  'Personal accident cover',
  'Zero depreciation',
  'Engine protection',
  'Roadside assistance',
  'NCB protection',
  'Key replacement',
  'Return to invoice',
  'Consumables cover',
  'Passenger cover',
  'Tyre protection'
];

function App() {
  const [carNumber, setCarNumber] = useState('');
  const [insuranceData, setInsuranceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRandomPrice = () => Math.floor(Math.random() * (2500 - 800) + 800);
  const generateRandomFeatures = () => {
    return FEATURES
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 3);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!carNumber.trim()) {
      alert('Please enter a car number');
      return;
    }

    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const mockData = INSURANCE_COMPANIES.map(company => ({
        company,
        price: generateRandomPrice(),
        rating: Math.floor(Math.random() * 2) + 4,
        features: generateRandomFeatures(),
        yearlyDiscount: Math.floor(Math.random() * 15) + 10
      })).sort((a, b) => a.price - b.price);

      setInsuranceData(mockData);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Car Insurance Finder</h1>
        <p>Compare quotes from top insurance providers</p>
      </header>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
          placeholder="Enter car number (e.g., ABC123XYZ)"
          pattern="[A-Za-z0-9]{9}"
          title="Please enter a 9-character alphanumeric car number"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {insuranceData && (
        <div className="results">
          <h2>Insurance Quotes</h2>
          <div className="insurance-grid">
            {insuranceData.map((insurance, index) => (
              <div key={index} className="insurance-card">
                <div className="company-header">
                  <h3>{insurance.company}</h3>
                  <div className="rating">
                    {'★'.repeat(insurance.rating)}
                    {'☆'.repeat(5 - insurance.rating)}
                  </div>
                </div>
                <div className="price-section">
                  <div className="price">${insurance.price}</div>
                  <div className="discount">{insurance.yearlyDiscount}% yearly discount</div>
                </div>
                <div className="features">
                  <h4>Key Features:</h4>
                  <ul>
                    {insurance.features.map((feature, i) => (
                      <li key={i}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
                <button className="quote-button">Get Quote</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;