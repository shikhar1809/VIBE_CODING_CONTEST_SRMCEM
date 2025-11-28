import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import { IssueMarker } from './IssueMarker';
import { useIssues } from '../../hooks/useIssues';
import { Issue } from '../../types/issue';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in react-leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Lucknow coordinates
const LUCKNOW_CENTER: [number, number] = [26.8467, 80.9462];
const DEFAULT_ZOOM = 12;

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    // Smooth zoom and pan animation
    map.flyTo(center, zoom, {
      duration: 1.0, // Animation duration in seconds
      easeLinearity: 0.25,
    });
  }, [center, zoom, map]);

  return null;
}

export function CityMap() {
  const { issues, loading } = useIssues();
  const [selectedIssueIndex, setSelectedIssueIndex] = useState<number | null>(null);
  const [visitedIndices, setVisitedIndices] = useState<Set<number>>(new Set());

  // Sort issues by creation date (newest first)
  const sortedIssues = useMemo(() => {
    return [...issues].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [issues]);

  // Calculate distances from current selected issue
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get next nearest report
  const getNextReport = () => {
    if (sortedIssues.length === 0) return;

    let nextIndex: number;

    if (selectedIssueIndex === null) {
      // Start with the latest (first in sorted array)
      nextIndex = 0;
    } else {
      const currentIssue = sortedIssues[selectedIssueIndex];
      const currentLat = currentIssue.latitude;
      const currentLng = currentIssue.longitude;

      // Find nearest unvisited issue
      const distances = sortedIssues.map((issue, idx) => ({
        index: idx,
        distance: getDistance(currentLat, currentLng, issue.latitude, issue.longitude),
        visited: visitedIndices.has(idx),
      }));

      // Filter out visited and current, sort by distance
      const unvisited = distances
        .filter(d => !d.visited && d.index !== selectedIssueIndex)
        .sort((a, b) => a.distance - b.distance);

      if (unvisited.length === 0) {
        // All visited, reset and start over
        setVisitedIndices(new Set());
        nextIndex = 0;
      } else {
        nextIndex = unvisited[0].index;
      }
    }

    setSelectedIssueIndex(nextIndex);
    setVisitedIndices(prev => new Set([...prev, nextIndex]));
  };

  const selectedIssue = selectedIssueIndex !== null ? sortedIssues[selectedIssueIndex] : null;

  // Center map on selected issue
  useEffect(() => {
    if (selectedIssue) {
      const mapElement = document.querySelector('.leaflet-container');
      if (mapElement) {
        // Trigger map update through a custom event or state
      }
    }
  }, [selectedIssue]);

  // Add pulsing animation CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.9;
        }
      }
      .custom-issue-marker {
        background: transparent !important;
        border: none !important;
      }
      .leaflet-control-zoom {
        border: 4px solid #000000 !important;
        border-radius: 0 !important;
      }
      .leaflet-control-zoom a {
        background-color: white !important;
        border: 3px solid #000000 !important;
        color: black !important;
        font-weight: bold !important;
        font-size: 18px !important;
      }
      .leaflet-control-zoom a:hover {
        background-color: #FFE66D !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Next Report Button */}
      {sortedIssues.length > 0 && (
        <div className="absolute top-4 right-4 z-[1000]">
          <Button
            onClick={getNextReport}
            className="neo-button bg-neo-cyan text-black font-bold"
          >
            <ChevronRight className="w-4 h-4 mr-2" />
            Next Report
          </Button>
        </div>
      )}

      <MapContainer
        center={selectedIssue ? [selectedIssue.latitude, selectedIssue.longitude] : LUCKNOW_CENTER}
        zoom={selectedIssue ? 15 : DEFAULT_ZOOM}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        key={selectedIssue ? `${selectedIssue.id}-${selectedIssue.latitude}` : 'default'}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <MapController 
          center={selectedIssue ? [selectedIssue.latitude, selectedIssue.longitude] : LUCKNOW_CENTER} 
          zoom={selectedIssue ? 15 : DEFAULT_ZOOM} 
        />
        
        {!loading && sortedIssues.map((issue, index) => (
          <IssueMarker
            key={issue.id}
            issue={issue}
            onClick={() => {
              setSelectedIssueIndex(index);
              setVisitedIndices(prev => new Set([...prev, index]));
            }}
            isSelected={selectedIssueIndex === index}
          />
        ))}
      </MapContainer>
    </div>
  );
}
