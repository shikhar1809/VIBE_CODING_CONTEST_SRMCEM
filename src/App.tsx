import React, { useEffect } from 'react';
import { WindowProvider, useWindows } from './contexts/WindowContext';
import { Navbar1 } from './components/os/Navbar1';
import { Dock } from './components/os/Dock';
import { AdminPanelWindow } from './components/admin/AdminPanelWindow';
import { ReportIssueWindow } from './components/reporting/ReportIssueWindow';
import { SettingsWindow } from './components/os/SettingsWindow';
import { seedDemoData } from './lib/seed-demo-data';
import { ContainerScroll } from './components/ui/container-scroll';
import { CityMap } from './components/map/CityMap';

function AppContent() {
  const { windows } = useWindows();

  useEffect(() => {
    // Seed demo data on mount
    seedDemoData().catch(console.error);
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Fixed Navbar at top */}
      <Navbar1 />

      {/* Container Scroll with Map */}
      <ContainerScroll
        titleComponent={
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              Experience SynergyHub
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Smart City Management System
            </p>
            <p className="text-sm md:text-base text-gray-400">
              Scroll to explore the interactive map
            </p>
          </div>
        }
      >
        <div className="h-full w-full relative flex flex-col">
          {/* Map Container */}
          <div className="flex-1 w-full h-full">
            <CityMap />
          </div>
        </div>
      </ContainerScroll>

      {/* Dock - Always visible at bottom */}
      <Dock />

      {/* Render all open windows */}
      {windows.map((window) => {
        if (window.app === 'admin') {
          return <AdminPanelWindow key={window.id} windowId={window.id} />;
        }
        if (window.app === 'report') {
          return <ReportIssueWindow key={window.id} windowId={window.id} />;
        }
        if (window.app === 'settings') {
          return <SettingsWindow key={window.id} windowId={window.id} />;
        }
        return null;
      })}
    </div>
  );
}

function App() {
  return (
    <WindowProvider>
      <AppContent />
    </WindowProvider>
  );
}

export default App;
