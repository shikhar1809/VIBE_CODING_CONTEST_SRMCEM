import React, { useEffect } from 'react';
import { WindowProvider, useWindows } from './contexts/WindowContext';
import { Navbar1 } from './components/os/Navbar1';
import { Dock } from './components/os/Dock';
import { Desktop } from './components/os/Desktop';
import { AdminPanelWindow } from './components/admin/AdminPanelWindow';
import { ReportIssueWindow } from './components/reporting/ReportIssueWindow';
import { SettingsWindow } from './components/os/SettingsWindow';
import { seedDemoData } from './lib/seed-demo-data';

function AppContent() {
  const { windows } = useWindows();

  useEffect(() => {
    // Seed demo data on mount
    seedDemoData().catch(console.error);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <Navbar1 />
      <Desktop />
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
