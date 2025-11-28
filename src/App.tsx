import { useEffect, useState } from 'react';
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
import TextType from './components/ui/TextType';
import ClickSpark from './components/ClickSpark';
import Folder from './components/Folder';

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
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
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
              <div className="text-lg md:text-xl text-gray-300 min-h-[2rem]">
                <TextType
                  text={["Smart City Management System", "Real-time Issue Tracking", "Citizen Engagement Platform"]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </div>
              <p className="text-sm md:text-base text-gray-400">
                Scroll to explore the interactive map
              </p>
            </div>
          }
          dockSnapped={dockSnapped}
        >
          <div className="h-full w-full relative flex flex-col">
            {/* Map Container */}
            <div className="flex-1 w-full h-full relative z-0">
              <CityMap />
            </div>
            
            {/* Dock inside container - on top of map */}
            <div className="absolute bottom-0 left-0 right-0 z-[1000] pointer-events-none">
              <Dock isSnapped={dockSnapped} />
            </div>
          </div>
        </ContainerScroll>

        {/* Key Features Section with Folder */}
        <div className="w-full py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Key Features
            </h2>
            <div style={{ height: '600px', position: 'relative' }}>
              <Folder 
                size={2} 
                color="#5227FF" 
                className="custom-folder"
                items={[
                  <div key="1" className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">🗺️ Interactive Map</h3>
                    <p className="text-gray-600">Real-time visualization of city issues on an interactive map of Lucknow</p>
                  </div>,
                  <div key="2" className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">📝 Issue Reporting</h3>
                    <p className="text-gray-600">Voice-enabled reporting system with automatic category detection and location tagging</p>
                  </div>,
                  <div key="3" className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">⚙️ Admin Panel</h3>
                    <p className="text-gray-600">Comprehensive dashboard for managing, tracking, and resolving city issues</p>
                  </div>
                ]}
              />
            </div>
          </div>
        </div>

        {/* Render all open windows in a fixed container */}
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          {windows.map((window) => {
            if (window.app === 'admin') {
              return <AdminPanelWindow key={window.id} />;
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
      </div>
    </ClickSpark>
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
