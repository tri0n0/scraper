import React from 'react';
import { Shield, DollarSign, Star, Check, Info } from 'lucide-react';
import type { InsuranceDetails } from '../types/insurance';

interface InsuranceCardProps {
  details: InsuranceDetails;
}

export const InsuranceCard: React.FC<InsuranceCardProps> = ({ details }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-indigo-600" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{details.company}</h3>
            <span className="text-green-600 text-sm font-medium">
              {details.yearlyDiscount}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < (details.rating || 0)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-green-600" />
            <span className="text-2xl font-bold text-green-600">{details.price}</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            or {details.monthlyOption}/month
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            Coverage up to
          </div>
          <div className="text-lg font-semibold text-gray-700">
            ${details.coverage.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Check className="w-4 h-4 text-green-500 mr-2" />
          {details.claimSettlement} settlement
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Check className="w-4 h-4 text-green-500 mr-2" />
          Deductible: ${details.deductible}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Key Features:</div>
        <div className="flex flex-wrap gap-2">
          {details.features.slice(0, 4).map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              <Check className="w-3 h-3 mr-1" />
              {feature}
            </span>
          ))}
          {details.features.length > 4 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <Info className="w-3 h-3 mr-1" />
              +{details.features.length - 4} more
            </span>
          )}
        </div>
      </div>

      <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center space-x-2">
        <span>Get Quote</span>
      </button>
    </div>
  );
};