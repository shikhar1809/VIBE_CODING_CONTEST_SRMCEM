import React, { useEffect, useState } from 'react';
import { WindowProvider, useWindows } from './contexts/WindowContext';
import { Navbar1 } from './components/os/Navbar1';
import { Dock } from './components/os/Dock';
import { AdminPanelWindow } from './components/admin/AdminPanelWindow';
import { ReportIssueWindow } from './components/reporting/ReportIssueWindow';
import { SettingsWindow } from './components/os/SettingsWindow';
import { seedDemoData } from './lib/seed-demo-data';
import { ContainerScroll } from './components/ui/container-scroll';
import { CityMap } from './components/map/CityMap';
import Background from './components/ui/Background';
import BlurText from './components/ui/BlurText';

function AppContent() {
  const { windows } = useWindows();
  const [dockSnapped, setDockSnapped] = useState(false);

  useEffect(() => {
    // Seed demo data on mount
    seedDemoData().catch(console.error);
  }, []);

  // Listen for interactions that should snap the dock
  useEffect(() => {
    const handleInteraction = () => {
      setDockSnapped(true);
    };

    // Listen for clicks, touches, and window opens
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    
    // Listen for window opens
    const checkWindows = () => {
      if (windows.length > 0) {
        setDockSnapped(true);
      }
    };
    
    const interval = setInterval(checkWindows, 100);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      clearInterval(interval);
    };
  }, [windows]);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden relative">
      {/* Background */}
      <Background />
      
      {/* Fixed Navbar at top */}
      <Navbar1 />

      {/* Container Scroll with Map and Dock */}
      <ContainerScroll
        titleComponent={
          <div className="text-center space-y-4">
            <BlurText
              text="Experience SynergyHub"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-6xl font-bold text-white mb-2"
            />
            <p className="text-lg md:text-xl text-gray-300">
              Smart City Management System
            </p>
            <p className="text-sm md:text-base text-gray-400">
              Scroll to explore the interactive map
            </p>
          </div>
        }
        dockSnapped={dockSnapped}
      >
        <div className="h-full w-full relative flex flex-col">
          {/* Map Container */}
          <div className="flex-1 w-full h-full">
            <CityMap />
          </div>
          
          {/* Dock inside container */}
          <Dock isSnapped={dockSnapped} />
        </div>
      </ContainerScroll>

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
