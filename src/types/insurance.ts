export interface InsuranceDetails {
    company: string;
    price: string;
    rating: number;
    features: string[];
    coverage: number;
    deductible: number;
    monthlyOption: string;
    claimSettlement: string;
    addOns: string[];
  }
  
  export const MOCK_FEATURES = [
    'Comprehensive coverage',
    '24/7 roadside assistance',
    'No claim bonus protection',
    'Zero depreciation cover',
    'Engine protection',
    'Key replacement cover'
  ];