import React from 'react';
import { Shield, Star } from 'lucide-react';

export const InsuranceCard = ({ insurance }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <Shield className="w-8 h-8 text-indigo-600" />
        <h3 className="text-xl font-semibold text-gray-800">
          {insurance.company}
        </h3>
      </div>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(insurance.rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    </div>

    <div className="mb-4">
      <div className="text-3xl font-bold text-green-600">
        ${insurance.price}
      </div>
      <div className="text-sm text-gray-500">
        or ${insurance.monthlyOption}/month
      </div>
    </div>

    <div className="mb-4">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Key Features:
      </div>
      <div className="space-y-2">
        {insurance.features.map((feature, i) => (
          <div key={i} className="flex items-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            {feature}
          </div>
        ))}
      </div>
    </div>

    <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
      Get Quote
    </button>
  </div>
);