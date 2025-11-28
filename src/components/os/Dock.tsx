import React, { useMemo } from 'react';
import { useWindows } from '../../contexts/WindowContext';
import MacOSDock from '../ui/mac-os-dock';
import { WindowApp } from '../../types/window';
import { AdminIcon, ReportIcon, SettingsIcon } from './DockIcons';

interface DockApp {
  id: string;
  name: string;
  icon: string | React.ReactNode;
}

export function Dock() {
  const { windows, openWindow } = useWindows();

  // Get list of open app IDs
  const openApps = useMemo(() => {
    return windows
      .filter(w => !w.minimized)
      .map(w => w.app)
      .filter((app): app is string => app !== null);
  }, [windows]);

  const handleAppClick = (appId: string) => {
    const appMap: Record<string, WindowApp> = {
      'admin': 'admin',
      'report': 'report',
      'settings': 'settings',
    };

    const app = appMap[appId];
    if (app) {
      openWindow(app, getAppTitle(app));
    }
  };

  const getAppTitle = (app: WindowApp): string => {
    const titles: Record<string, string> = {
      'admin': 'Admin Panel',
      'report': 'Report Issue',
      'settings': 'Settings',
    };
    return titles[app] || 'App';
  };

  const dockApps: DockApp[] = useMemo(() => [
    {
      id: 'admin',
      name: 'Admin Panel',
      icon: <AdminIcon size={64} />,
    },
    {
      id: 'report',
      name: 'Report Issue',
      icon: <ReportIcon size={64} />,
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <SettingsIcon size={64} />,
    },
  ], []);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex justify-center">
      <MacOSDock
        apps={dockApps}
        onAppClick={handleAppClick}
        openApps={openApps}
      />
    </div>
  );
}
