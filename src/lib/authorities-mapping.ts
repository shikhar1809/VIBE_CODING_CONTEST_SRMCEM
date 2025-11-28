// Authority mapping for Lucknow based on locations
// Maps areas/coordinates to relevant authorities

export interface Authority {
  id: string;
  name: string;
  department: string;
  contact?: string;
  area: string[];
}

export const authorities: Authority[] = [
  {
    id: 'lko-municipal',
    name: 'Lucknow Municipal Corporation',
    department: 'Municipal Services',
    area: ['Hazratganj', 'Gomti Nagar', 'Indira Nagar', 'Aliganj'],
  },
  {
    id: 'lko-traffic',
    name: 'Traffic Police Department',
    department: 'Traffic Management',
    area: ['Charbagh', 'Aminabad', 'University Road', 'Gomti Nagar'],
  },
  {
    id: 'lko-pwd',
    name: 'Public Works Department',
    department: 'Road Maintenance',
    area: ['Kanpur Road', 'Sitapur Road', 'Alambagh', 'Old City'],
  },
  {
    id: 'lko-water',
    name: 'Jal Sansthan',
    department: 'Water Supply',
    area: ['Mahanagar', 'Trans-Gomti', 'Indira Nagar', 'Gomti Nagar'],
  },
  {
    id: 'lko-power',
    name: 'Uttar Pradesh Power Corporation',
    department: 'Electricity',
    area: ['Old City', 'Aliganj', 'Aminabad', 'Charbagh'],
  },
  {
    id: 'lko-streetlights',
    name: 'Municipal Lighting Department',
    department: 'Street Lighting',
    area: ['University Road', 'Rumi Gate', 'Hazratganj', 'Gomti Nagar'],
  },
];

// Get authorities based on location
export function getAuthoritiesForLocation(latitude: number, longitude: number): Authority[] {
  // Simple area-based matching (in production, use proper geocoding)
  const locationAreas = getLocationArea(latitude, longitude);
  
  return authorities.filter(auth => 
    auth.area.some(area => 
      locationAreas.some(locArea => 
        locArea.toLowerCase().includes(area.toLowerCase()) ||
        area.toLowerCase().includes(locArea.toLowerCase())
      )
    )
  );
}

// Determine area based on coordinates (simplified)
function getLocationArea(lat: number, lng: number): string[] {
  const areas: string[] = [];
  
  // Gomti Nagar area
  if (lat >= 26.86 && lat <= 26.90 && lng >= 0.98 && lng <= 1.01) {
    areas.push('Gomti Nagar');
  }
  
  // Hazratganj area
  if (lat >= 26.84 && lat <= 26.86 && lng >= 0.94 && lng <= 0.96) {
    areas.push('Hazratganj');
  }
  
  // Old City area
  if (lat >= 26.83 && lat <= 26.85 && lng >= 0.91 && lng <= 0.93) {
    areas.push('Old City');
  }
  
  // Charbagh area
  if (lat >= 26.82 && lat <= 26.84 && lng >= 0.90 && lng <= 0.92) {
    areas.push('Charbagh');
  }
  
  // Aliganj area
  if (lat >= 26.84 && lat <= 26.86 && lng >= 0.92 && lng <= 0.94) {
    areas.push('Aliganj');
  }
  
  // University Road
  if (lat >= 26.85 && lat <= 26.87 && lng >= 0.93 && lng <= 0.95) {
    areas.push('University Road');
  }
  
  // Default to general areas if no match
  if (areas.length === 0) {
    areas.push('General');
  }
  
  return areas;
}

// Category to authority mapping
export function getAuthoritiesForCategory(category: string): Authority[] {
  const categoryMap: Record<string, string[]> = {
    garbage: ['lko-municipal'],
    traffic: ['lko-traffic'],
    potholes: ['lko-pwd'],
    water: ['lko-water'],
    electricity: ['lko-power'],
    streetlights: ['lko-streetlights'],
  };
  
  const authorityIds = categoryMap[category] || [];
  return authorities.filter(auth => authorityIds.includes(auth.id));
}

