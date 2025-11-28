import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Issue, categoryEmojis } from '../../types/issue';
import L from 'leaflet';

interface IssueMarkerProps {
  issue: Issue;
  onClick?: (issue: Issue) => void;
  isSelected?: boolean;
}

// Create custom icon with emoji and neo-brutalism styling
function createCustomIcon(emoji: string, isActive: boolean, isSelected: boolean) {
  const size = isSelected ? 50 : 40;
  const borderWidth = isSelected ? 5 : 4;
  return L.divIcon({
    className: 'custom-issue-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border: ${borderWidth}px solid #000000;
        background-color: ${isSelected ? '#00F5FF' : isActive ? '#FFE66D' : '#FFFFFF'};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${isSelected ? 28 : 24}px;
        animation: ${isActive || isSelected ? 'pulse 1s infinite' : 'none'};
        box-shadow: ${borderWidth}px ${borderWidth}px 0px 0px #000000;
        z-index: ${isSelected ? 1000 : 100};
      ">
        ${emoji}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export function IssueMarker({ issue, onClick, isSelected = false }: IssueMarkerProps) {
  const emoji = categoryEmojis[issue.category];
  const isActive = issue.status === 'pending' || issue.status === 'in_progress';

  return (
    <Marker
      position={[issue.latitude, issue.longitude]}
      icon={createCustomIcon(emoji, isActive, isSelected)}
      eventHandlers={{
        click: () => {
          if (onClick) {
            onClick(issue);
          }
        },
      }}
      zIndexOffset={isSelected ? 1000 : 0}
    >
      <Popup>
        <div className="neo-card p-4 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{emoji}</span>
            <h3 className="font-bold text-black">{issue.title}</h3>
          </div>
          <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
          <div className="flex gap-2">
            <span className="neo-border-thick bg-neo-yellow px-2 py-1 text-xs font-bold text-black">
              {issue.status}
            </span>
            <span className="neo-border-thick bg-neo-cyan px-2 py-1 text-xs font-bold text-black">
              {issue.priority}
            </span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

