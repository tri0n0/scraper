import React from 'react';
import { LayoutGrid, Table } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'table';
  onViewChange: (view: 'grid' | 'table') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      <button
        onClick={() => onViewChange('grid')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-l-lg ${
          view === 'grid'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Grid</span>
      </button>
      <button
        onClick={() => onViewChange('table')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-r-lg ${
          view === 'table'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Table className="w-4 h-4" />
        <span>Table</span>
      </button>
    </div>
  );
};