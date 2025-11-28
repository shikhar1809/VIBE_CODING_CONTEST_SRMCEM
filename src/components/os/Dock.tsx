import { useMemo } from 'react';
import { useWindows } from '../../contexts/WindowContext';
import MacOSDock from '../ui/mac-os-dock';
import { WindowApp } from '../../types/window';
import { AdminIcon, ReportIcon, SettingsIcon } from './DockIcons';
import { motion } from 'framer-motion';

interface DockProps {
  isSnapped?: boolean;
}

export function Dock({ isSnapped = false }: DockProps) {
  const { windows, openWindow } = useWindows();

  // Get list of open app IDs
  const openApps = useMemo(() => {
    return windows
      .filter(w => !w.minimized && w.app !== null)
      .map(w => w.app as string);
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
    if (!app) return 'App';
    const titles: Record<string, string> = {
      'admin': 'Admin Panel',
      'report': 'Report Issue',
      'settings': 'Settings',
    };
    return titles[app] || 'App';
  };

  const dockApps = useMemo(() => [
    {
      id: 'admin',
      name: 'Admin Panel',
      icon: <AdminIcon size={80} />,
    },
    {
      id: 'report',
      name: 'Report Issue',
      icon: <ReportIcon size={80} />,
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <SettingsIcon size={80} />,
    },
  ], []);

  return (
    <motion.div
      className="w-full flex justify-center z-[1000]"
      initial={false}
      animate={{
        scale: isSnapped ? 1.1 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      style={{
        pointerEvents: 'auto',
      }}
    >
      <div className="transform scale-125 relative z-[1000]">
        <MacOSDock
          apps={dockApps.map(app => ({
            id: app.id,
            name: app.name,
            icon: app.icon,
          }))}
          onAppClick={handleAppClick}
          openApps={openApps}
        />
      </div>
    </motion.div>
  );
}
