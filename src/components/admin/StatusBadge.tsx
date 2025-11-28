import React from 'react';
import { Badge } from '../ui/badge';
import { IssueStatus } from '../../types/issue';
import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: IssueStatus;
  className?: string;
}

const statusColors: Record<IssueStatus, string> = {
  pending: 'bg-neo-yellow',
  in_progress: 'bg-neo-cyan',
  resolved: 'bg-neo-green',
};

const statusLabels: Record<IssueStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'neo-border-thick px-3 py-1 text-xs font-bold text-black',
        statusColors[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

