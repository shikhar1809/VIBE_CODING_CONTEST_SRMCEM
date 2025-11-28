import { Settings, FileText, Shield } from 'lucide-react';

interface DockIconProps {
  size: number;
  className?: string;
}

export function AdminIcon({ size, className }: DockIconProps) {
  const borderRadius = Math.max(8, size * 0.15);
  return (
    <div
      className={`flex items-center justify-center ${className || ''}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: 'linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)',
        borderRadius: `${borderRadius}px`,
        border: `${Math.max(1, size * 0.03)}px solid rgba(0, 0, 0, 0.2)`,
      }}
    >
      <Shield 
        size={size * 0.6} 
        className="text-white"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
      />
    </div>
  );
}

export function ReportIcon({ size, className }: DockIconProps) {
  const borderRadius = Math.max(8, size * 0.15);
  return (
    <div
      className={`flex items-center justify-center ${className || ''}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: 'linear-gradient(135deg, #00FF88 0%, #00CC6A 100%)',
        borderRadius: `${borderRadius}px`,
        border: `${Math.max(1, size * 0.03)}px solid rgba(0, 0, 0, 0.2)`,
      }}
    >
      <FileText 
        size={size * 0.6} 
        className="text-white"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
      />
    </div>
  );
}

export function SettingsIcon({ size, className }: DockIconProps) {
  const borderRadius = Math.max(8, size * 0.15);
  return (
    <div
      className={`flex items-center justify-center ${className || ''}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: 'linear-gradient(135deg, #FF6B35 0%, #C44536 100%)',
        borderRadius: `${borderRadius}px`,
        border: `${Math.max(1, size * 0.03)}px solid rgba(0, 0, 0, 0.2)`,
      }}
    >
      <Settings 
        size={size * 0.6} 
        className="text-white"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
      />
    </div>
  );
}

