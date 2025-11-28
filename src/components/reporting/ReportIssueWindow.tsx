import { useState } from 'react';
import { Window } from '../os/Window';
import { ReportForm } from './ReportForm';
import { useWindows } from '../../contexts/WindowContext';
import { Button } from '../ui/button';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import { MapPin } from 'lucide-react';

interface ReportIssueWindowProps {
  windowId: string;
  defaultLat?: number;
  defaultLng?: number;
}

// Component to handle map clicks
function MapClickHandler({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function ReportIssueWindow({ windowId, defaultLat, defaultLng }: ReportIssueWindowProps) {
  const { closeWindow } = useWindows();
  const [selectedLat, setSelectedLat] = useState<number | undefined>(defaultLat);
  const [selectedLng, setSelectedLng] = useState<number | undefined>(defaultLng);
  const [showMap, setShowMap] = useState(false);

  const handleSuccess = () => {
    setTimeout(() => {
      closeWindow(windowId);
    }, 1500);
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLat(lat);
    setSelectedLng(lng);
    setShowMap(false);
  };

  return (
    <Window id={windowId} title="Report Issue" defaultWidth={900} defaultHeight={700}>
      <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-white">
        {showMap ? (
          <div className="flex-1 relative">
            <div className="absolute top-2 right-2 z-[1000] bg-white neo-border-thick p-2">
              <button
                onClick={() => setShowMap(false)}
                className="neo-button bg-red-500 text-white px-4 py-2 font-bold"
              >
                Close Map
              </button>
            </div>
            <MapContainer
              center={[selectedLat || 26.8467, selectedLng || 80.9462]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapClickHandler onLocationSelect={handleLocationSelect} />
              {selectedLat && selectedLng && (
                <Marker position={[selectedLat, selectedLng]}>
                  <Popup>
                    <div className="font-bold text-black">Selected Location</div>
                    <div className="text-sm">
                      {selectedLat.toFixed(6)}, {selectedLng.toFixed(6)}
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <ReportForm
              defaultLat={selectedLat}
              defaultLng={selectedLng}
              onSuccess={handleSuccess}
              onCancel={() => closeWindow(windowId)}
              onLocationSelect={handleLocationSelect}
            />
            <div className="p-4">
              <Button
                type="button"
                onClick={() => setShowMap(true)}
                className="neo-button bg-neo-cyan text-black w-full"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Select Location on Map
              </Button>
            </div>
          </div>
        )}
      </div>
    </Window>
  );
}

