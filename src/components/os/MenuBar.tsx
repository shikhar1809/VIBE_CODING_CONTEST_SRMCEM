
export function MenuBar() {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="neo-border-thick bg-neo-cyan fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <span className="font-bold text-black text-lg">SynergyHub</span>
        <span className="font-semibold text-black text-sm">Smart City Management</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-black text-sm">Lucknow, UP</span>
        <span className="font-bold text-black text-sm">{currentTime}</span>
      </div>
    </div>
  );
}

