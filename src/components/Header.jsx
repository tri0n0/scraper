import React from 'react';
import { Shield } from 'lucide-react';

export const Header = () => (
  <div className="text-center mb-12">
    <div className="flex items-center justify-center space-x-3 mb-4">
      <Shield className="w-12 h-12 text-indigo-600" />
    </div>
    <h1 className="text-4xl font-bold text-gray-900 mb-4">
      Car Insurance Finder
    </h1>
    <p className="text-xl text-gray-600">
      Compare quotes from top insurance providers
    </p>
  </div>
);