import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { InsuranceTable } from './components/InsuranceTable';
import { INSURANCE_COMPANIES } from './data/insuranceData';

function App() {
  const [carNumber, setCarNumber] = useState('');
  const [insuranceData, setInsuranceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!carNumber.trim()) {
      alert('Please enter a car number');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setInsuranceData(INSURANCE_COMPANIES);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="gradient-bg py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Header />
        <SearchForm
          carNumber={carNumber}
          setCarNumber={setCarNumber}
          handleSearch={handleSearch}
          loading={loading}
        />
        {insuranceData && <InsuranceTable insuranceData={insuranceData} />}
      </div>
    </div>
  );
}

export default App;