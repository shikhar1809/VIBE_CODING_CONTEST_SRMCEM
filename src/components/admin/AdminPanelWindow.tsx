import React, { useState, useMemo } from 'react';
import { Window } from '../os/Window';
import { IssuesTable } from './IssuesTable';
import { IssueDetails } from './IssueDetails';
import { useIssues } from '../../hooks/useIssues';
import { Issue, IssueStatus, IssueCategory, IssuePriority } from '../../types/issue';
import { updateIssueStatus, assignIssue, deleteIssue } from '../../lib/issue-service';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { categoryLabels } from '../../types/issue';
import { useWindows } from '../../contexts/WindowContext';

interface AdminPanelWindowProps {
  windowId: string;
}

export function AdminPanelWindow({ windowId }: AdminPanelWindowProps) {
  const { issues, loading, refetch } = useIssues();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<IssueCategory | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<IssuePriority | 'all'>('all');
  const { closeWindow } = useWindows();

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (statusFilter !== 'all' && issue.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && issue.category !== categoryFilter) return false;
      if (priorityFilter !== 'all' && issue.priority !== priorityFilter) return false;
      return true;
    });
  }, [issues, statusFilter, categoryFilter, priorityFilter]);

  const handleStatusChange = async (issueId: string, status: IssueStatus) => {
    try {
      await updateIssueStatus(issueId, status);
      refetch();
      if (selectedIssue?.id === issueId) {
        setSelectedIssue({ ...selectedIssue, status });
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    }
  };

  const handleAssign = async (issueId: string, assignedTo: string) => {
    try {
      await assignIssue(issueId, assignedTo);
      refetch();
      if (selectedIssue?.id === issueId) {
        setSelectedIssue({ ...selectedIssue, assigned_to: assignedTo });
      }
    } catch (error) {
      console.error('Failed to assign issue:', error);
      alert('Failed to assign issue');
    }
  };

  const handleDelete = async (issueId: string) => {
    try {
      await deleteIssue(issueId);
      refetch();
      if (selectedIssue?.id === issueId) {
        setSelectedIssue(null);
      }
    } catch (error) {
      console.error('Failed to delete issue:', error);
      alert('Failed to delete issue');
    }
  };

  const stats = useMemo(() => {
    return {
      total: issues.length,
      pending: issues.filter(i => i.status === 'pending').length,
      inProgress: issues.filter(i => i.status === 'in_progress').length,
      resolved: issues.filter(i => i.status === 'resolved').length,
      byCategory: Object.keys(categoryLabels).reduce((acc, cat) => {
        acc[cat] = issues.filter(i => i.category === cat).length;
        return acc;
      }, {} as Record<string, number>),
    };
  }, [issues]);

  return (
    <Window id={windowId} title="Admin Panel - SynergyHub">
      <div className="h-full flex flex-col p-4 space-y-4">
        {/* Statistics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="neo-card p-4">
            <div className="text-sm font-bold text-gray-600">Total Issues</div>
            <div className="text-2xl font-bold text-black">{stats.total}</div>
          </div>
          <div className="neo-card p-4 bg-neo-yellow">
            <div className="text-sm font-bold text-black">Pending</div>
            <div className="text-2xl font-bold text-black">{stats.pending}</div>
          </div>
          <div className="neo-card p-4 bg-neo-cyan">
            <div className="text-sm font-bold text-black">In Progress</div>
            <div className="text-2xl font-bold text-black">{stats.inProgress}</div>
          </div>
          <div className="neo-card p-4 bg-neo-green">
            <div className="text-sm font-bold text-black">Resolved</div>
            <div className="text-2xl font-bold text-black">{stats.resolved}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="neo-border-thick w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as any)}>
            <SelectTrigger className="neo-border-thick w-40">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as any)}>
            <SelectTrigger className="neo-border-thick w-40">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={refetch}
            className="neo-button bg-neo-purple text-white ml-auto"
          >
            Refresh
          </Button>
        </div>

        {/* Issues Table */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="font-bold text-black">Loading issues...</div>
            </div>
          ) : (
            <IssuesTable
              issues={filteredIssues}
              onIssueClick={setSelectedIssue}
            />
          )}
        </div>
      </div>

      {/* Issue Details Dialog */}
      <IssueDetails
        issue={selectedIssue}
        open={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
        onStatusChange={handleStatusChange}
        onAssign={handleAssign}
        onDelete={handleDelete}
      />
    </Window>
  );
}

