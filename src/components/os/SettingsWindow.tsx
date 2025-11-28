import { Window } from './Window';

interface SettingsWindowProps {
  windowId: string;
}

export function SettingsWindow({ windowId }: SettingsWindowProps) {
  return (
    <Window id={windowId} title="Settings">
      <div className="p-6">
        <div className="neo-card p-4 mb-4">
          <h2 className="font-bold text-black text-lg mb-2">System Settings</h2>
          <p className="text-gray-700">Settings panel coming soon...</p>
        </div>
        <div className="neo-card p-4">
          <h2 className="font-bold text-black text-lg mb-2">About SynergyHub</h2>
          <p className="text-gray-700 mb-2">Smart City Management System</p>
          <p className="text-sm text-gray-600">Version 1.0.0</p>
        </div>
      </div>
    </Window>
  );
}

