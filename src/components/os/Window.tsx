import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';
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
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition } = useWindows();
  const windowState = windows.find(w => w.id === id);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (windowState) {
      focusWindow(id);
    }
  }, []);

  if (!windowState || windowState.minimized) {
    return null;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      focusWindow(id);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !windowState.maximized) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        updateWindowPosition(id, Math.max(0, newX), Math.max(0, newY));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, windowState.maximized, id, updateWindowPosition]);

  const style: React.CSSProperties = windowState.maximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: windowState.zIndex,
      }
    : {
        position: 'fixed',
        left: `${windowState.x}px`,
        top: `${windowState.y}px`,
        width: `${windowState.width}px`,
        height: `${windowState.height}px`,
        zIndex: windowState.zIndex,
      };

  return (
    <div
      ref={windowRef}
      style={style}
      className="neo-window bg-white"
      onClick={() => focusWindow(id)}
    >
      {/* Title Bar */}
      <div
        className="neo-border-thick bg-neo-yellow flex items-center justify-between px-4 py-2 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="font-bold text-black text-sm">{title}</span>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
            className="neo-border-thick bg-white hover:bg-gray-200 w-6 h-6 flex items-center justify-center font-bold"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(id);
            }}
            className="neo-border-thick bg-white hover:bg-gray-200 w-6 h-6 flex items-center justify-center font-bold"
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            className="neo-border-thick bg-red-500 hover:bg-red-600 text-white w-6 h-6 flex items-center justify-center font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-48px)] overflow-auto bg-white">
        {children}
      </div>
    </div>
  );
}

