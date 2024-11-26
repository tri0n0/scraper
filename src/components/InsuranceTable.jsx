import React from 'react';
import { Shield, Star, Check } from 'lucide-react';

export const InsuranceTable = ({ insuranceData }) => (
  <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="table-header">Company</th>
          <th className="table-header">Price</th>
          <th className="table-header">Rating</th>
          <th className="table-header">Coverage</th>
          <th className="table-header">Features</th>
          <th className="table-header">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {insuranceData.map((insurance, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="table-cell">
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-indigo-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">{insurance.name}</div>
                  <div className="text-sm text-green-600">{insurance.yearlyDiscount}% yearly discount</div>
                </div>
              </div>
            </td>
            <td className="table-cell">
              <div className="text-lg font-semibold text-green-600">${insurance.price}</div>
              <div className="text-sm text-gray-500">${insurance.monthlyPrice}/month</div>
            </td>
            <td className="table-cell">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < insurance.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </td>
            <td className="table-cell">
              <div className="text-sm text-gray-900">Up to ${insurance.coverage.toLocaleString()}</div>
              <div className="text-sm text-gray-500">{insurance.claimSettlement}</div>
            </td>
            <td className="table-cell">
              <div className="flex flex-wrap gap-1">
                {insurance.features.map((feature, i) => (
                  <span key={i} className="feature-tag">
                    <Check className="w-3 h-3 mr-1" />
                    {feature}
                  </span>
                ))}
              </div>
            </td>
            <td className="table-cell">
              <button className="btn-primary">
                Get Quote
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);