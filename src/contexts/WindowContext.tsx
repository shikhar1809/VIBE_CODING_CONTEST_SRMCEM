import React, { createContext, useContext, useState, useCallback } from 'react';
import { WindowState, WindowApp, WindowContextType } from '../types/window';

const WindowContext = createContext<WindowContextType | undefined>(undefined);

let nextZIndex = 1000;
let windowIdCounter = 0;

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const openWindow = useCallback((app: WindowApp, title: string) => {
    if (!app) return;

    // Check if window already exists
    const existingWindow = windows.find(w => w.app === app && !w.minimized);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    // Calculate initial position to avoid overlap
    const offset = 50;
    const defaultWidth = 800;
    const defaultHeight = 600;
    
    // Safely get window dimensions
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    
    const initialX = Math.min(100 + windows.length * offset, viewportWidth - defaultWidth - 20);
    const initialY = Math.min(100 + windows.length * offset, viewportHeight - defaultHeight - 20);
    
    const newWindow: WindowState = {
      id: `window-${windowIdCounter++}`,
      app,
      title,
      x: Math.max(20, initialX),
      y: Math.max(20, initialY),
      width: defaultWidth,
      height: defaultHeight,
      minimized: false,
      maximized: false,
      zIndex: nextZIndex++,
    };

    setWindows(prev => [...prev, newWindow]);
  }, [windows]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, minimized: !w.minimized } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => ({
        ...w,
        zIndex: w.id === id ? nextZIndex++ : w.zIndex,
      }))
    );
  }, []);

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  const updateWindowSize = useCallback((id: string, width: number, height: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, width, height } : w))
    );
  }, []);

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindows must be used within a WindowProvider');
  }
  return context;
}

