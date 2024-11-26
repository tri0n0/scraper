import { PREMIUM_RANGES, COVERAGE_RANGES, ADD_ONS } from '../data/mockInsuranceData';

export const generateRandomPrice = () => {
  const base = Math.floor(
    Math.random() * (PREMIUM_RANGES.max - PREMIUM_RANGES.min) + PREMIUM_RANGES.min
  );
  return base - (base % 50); // Round to nearest 50
};

export const generateRandomCoverage = () => {
  return Math.floor(
    Math.random() * (COVERAGE_RANGES.max - COVERAGE_RANGES.min) + COVERAGE_RANGES.min
  );
};

export const generateRandomAddOns = () => {
  const count = Math.floor(Math.random() * 4) + 2; // 2-5 add-ons
  const shuffled = [...ADD_ONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generateRandomClaimSettlement = () => {
  const percentage = Math.floor(Math.random() * 15) + 85; // 85-99%
  const days = Math.floor(Math.random() * 4) + 3; // 3-6 days
  return `${percentage}% within ${days} days`;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};