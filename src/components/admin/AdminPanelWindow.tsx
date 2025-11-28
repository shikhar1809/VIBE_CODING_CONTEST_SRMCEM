import React, { useState, useEffect } from 'react';
import { Window } from '../os/Window';
import { IssuesTable } from './IssuesTable';
import { useIssues } from '../../hooks/useIssues';
import { useWindows } from '../../contexts/WindowContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Loader2 } from 'lucide-react';

const LOADING_MESSAGES = [
  'Loading data...',
  'Checking reports...',
  'Analyzing issues...',
  'Preparing dashboard...',
];

export function AdminPanelWindow() {
  const { windows } = useWindows();
  const windowState = windows.find(w => w.id === 'admin');
  const { issues, loading, error, refetchIssues } = useIssues();
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [loadingStep, setLoadingStep] = useState(0);

  // Cycle through loading messages
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          const next = (prev + 1) % LOADING_MESSAGES.length;
          setLoadingMessage(LOADING_MESSAGES[next]);
          return next;
        });
      }, 800); // Change message every 800ms

      return () => clearInterval(interval);
    } else {
      setLoadingStep(0);
      setLoadingMessage(LOADING_MESSAGES[0]);
    }
  }, [loading]);

  if (!windowState || !windowState.isOpen) return null;

  return (
    <Window id="admin" title="Admin Panel" defaultWidth={1200} defaultHeight={800} defaultX={50} defaultY={50}>
      <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-white">
        <div className="p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-gray-800">Smart City Issues Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor all reported issues</p>
        </div>

        <Tabs defaultValue="all-issues" className="flex-grow flex flex-col p-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-100/80 backdrop-blur-sm border border-gray-200 rounded-lg p-1">
            <TabsTrigger 
              value="all-issues" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all"
            >
              All Issues
            </TabsTrigger>
            <TabsTrigger 
              value="statistics" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all"
            >
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-issues" className="flex-grow mt-6 overflow-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-gray-600 font-medium animate-pulse">{loadingMessage}</p>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-600 font-medium">Error loading issues</p>
                  <p className="text-sm text-red-500 mt-2">{error}</p>
                  <button
                    onClick={() => refetchIssues()}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : issues.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6">
                  <p className="text-gray-500 font-medium">No issues reported yet</p>
                  <p className="text-sm text-gray-400 mt-2">Issues will appear here once reported</p>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
                <IssuesTable issues={issues} onIssueClick={() => {}} onUpdateIssue={refetchIssues} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="statistics" className="flex-grow mt-6 overflow-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Issue Statistics</h3>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  <p className="text-gray-600 text-sm">{loadingMessage}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">Total Issues</p>
                    <p className="text-3xl font-bold text-blue-700 mt-2">{issues.length}</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                    <p className="text-sm text-yellow-600 font-medium">Pending</p>
                    <p className="text-3xl font-bold text-yellow-700 mt-2">
                      {issues.filter(i => i.status === 'pending').length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-green-600 font-medium">Resolved</p>
                    <p className="text-3xl font-bold text-green-700 mt-2">
                      {issues.filter(i => i.status === 'resolved').length}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Window>
  );
}
