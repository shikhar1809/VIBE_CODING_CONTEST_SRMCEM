import { useState, useRef, useEffect } from 'react';
import { useWindows } from '../../contexts/WindowContext';
import { cn } from '../../lib/utils';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
}

export function Window({
  id,
  title,
  children,
  defaultWidth = 800,
  defaultHeight = 600,
  defaultX = 100,
  defaultY = 100,
}: WindowProps) {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } = useWindows();
  const windowState = windows.find(w => w.id === id);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!windowState) {
      updateWindowPosition(id, defaultX, defaultY);
      updateWindowSize(id, defaultWidth, defaultHeight);
    }
  }, [id, windowState, defaultX, defaultY, defaultWidth, defaultHeight, updateWindowPosition, updateWindowSize]);

  if (!windowState) return null;
  if (windowState.minimized) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current && e.target === windowRef.current.querySelector('.window-header')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - windowState.x,
        y: e.clientY - windowState.y,
      });
      focusWindow(id);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      // Constrain to viewport with padding
      const padding = 20;
      const maxX = window.innerWidth - windowState.width - padding;
      const maxY = window.innerHeight - windowState.height - padding;
      
      newX = Math.max(padding, Math.min(newX, maxX));
      newY = Math.max(padding, Math.min(newY, maxY));

      updateWindowPosition(id, newX, newY);
    } else if (isResizing) {
      const { clientX, clientY } = e;
      const { x, y, width, height } = windowState;
      let newWidth = width;
      let newHeight = height;

      switch (resizeDirection) {
        case 'right':
          newWidth = clientX - x;
          break;
        case 'bottom':
          newHeight = clientY - y;
          break;
        case 'bottom-right':
          newWidth = clientX - x;
          newHeight = clientY - y;
          break;
      }

      // Constrain resize to viewport
      const maxWidth = window.innerWidth - x - 20;
      const maxHeight = window.innerHeight - y - 20;
      
      newWidth = Math.max(300, Math.min(newWidth, maxWidth));
      newHeight = Math.max(200, Math.min(newHeight, maxHeight));

      updateWindowSize(id, newWidth, newHeight);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    focusWindow(id);
  };

  const style = windowState.maximized
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        transform: 'none',
        zIndex: windowState.zIndex,
      }
    : {
        top: windowState.y,
        left: windowState.x,
        width: windowState.width,
        height: windowState.height,
        zIndex: windowState.zIndex,
      };

  return (
    <div
      ref={windowRef}
      className={cn(
        "fixed flex flex-col bg-white rounded-lg shadow-2xl overflow-hidden",
        "backdrop-blur-xl bg-white/90 border border-gray-200/50",
        windowState.maximized ? "rounded-none" : "rounded-xl",
        windowState.minimized && "hidden"
      )}
      style={{
        ...style,
        transition: isDragging || isResizing ? 'none' : 'all 0.2s ease-out',
        maxWidth: windowState.maximized ? '100vw' : `${window.innerWidth - 40}px`,
        maxHeight: windowState.maximized ? '100vh' : `${window.innerHeight - 40}px`,
      }}
      onMouseDown={() => focusWindow(id)}
      onClick={(e) => {
        e.stopPropagation();
        focusWindow(id);
      }}
    >
      {/* macOS-style title bar */}
      <div
        className="window-header flex items-center justify-between px-4 py-2 bg-gradient-to-b from-gray-100 to-gray-50 border-b border-gray-200 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        {/* macOS traffic lights */}
        <div className="flex items-center gap-2">
          <button
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            onClick={() => closeWindow(id)}
            aria-label="Close"
          />
          <button
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            onClick={() => minimizeWindow(id)}
            aria-label="Minimize"
          />
          <button
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            onClick={() => maximizeWindow(id)}
            aria-label="Maximize"
          />
        </div>
        <span className="font-medium text-gray-700 text-sm absolute left-1/2 transform -translate-x-1/2">{title}</span>
        <div className="w-12"></div> {/* Spacer for centering */}
      </div>
      
      {/* Window content */}
      <div className="flex-grow overflow-auto bg-white/95 backdrop-blur-sm pointer-events-auto">
        {children}
      </div>
      
      {/* Resize handles */}
      {!windowState.maximized && (
        <>
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-transparent hover:bg-blue-500/20"
            onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
          />
          <div
            className="absolute bottom-0 left-0 right-4 h-4 cursor-s-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
          />
          <div
            className="absolute top-0 bottom-4 right-0 w-4 cursor-e-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
          />
        </>
      )}
    </div>
  );
}
