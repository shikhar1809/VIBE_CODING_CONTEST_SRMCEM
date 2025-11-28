import React from 'react';
import { useWindows } from '../../contexts/WindowContext';
import { WindowApp } from '../../types/window';
import { cn } from '../../lib/utils';

interface AppIconProps {
  app: WindowApp;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export function AppIcon({ app, label, icon, color }: AppIconProps) {
  const { openWindow } = useWindows();

  return (
    <button
      onClick={() => openWindow(app, label)}
      className="neo-border-thick bg-white w-20 h-24 flex flex-col items-center justify-center gap-2 p-2 hover:bg-gray-50 transition-all"
      title={label}
    >
      <div className={cn('neo-border-thick w-12 h-12 flex items-center justify-center', color)}>
        {icon}
      </div>
      <span className="text-xs font-bold text-black text-center">{label}</span>
    </button>
  );
}

