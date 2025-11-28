import React from 'react';
import { CityMap } from '../map/CityMap';

export function Desktop() {
  return (
    <div className="fixed inset-0 bg-gray-100" style={{ top: '80px', bottom: '120px' }}>
      <CityMap />
    </div>
  );
}

