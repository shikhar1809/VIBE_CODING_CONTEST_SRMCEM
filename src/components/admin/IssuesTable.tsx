import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Issue, categoryEmojis, categoryLabels } from '../../types/issue';
import { StatusBadge } from './StatusBadge';
import { Badge } from '../ui/badge';

interface IssuesTableProps {
  issues: Issue[];
  onIssueClick?: (issue: Issue) => void;
}

export function IssuesTable({ issues, onIssueClick }: IssuesTableProps) {
  return (
    <div className="neo-border-thick bg-white">
      <Table>
        <TableHeader>
          <TableRow className="neo-border-thick">
            <TableHead className="font-bold text-black">Category</TableHead>
            <TableHead className="font-bold text-black">Title</TableHead>
            <TableHead className="font-bold text-black">Status</TableHead>
            <TableHead className="font-bold text-black">Priority</TableHead>
            <TableHead className="font-bold text-black">Location</TableHead>
            <TableHead className="font-bold text-black">Authorities</TableHead>
            <TableHead className="font-bold text-black">Reported</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow
              key={issue.id}
              className="neo-border-thick cursor-pointer hover:bg-gray-100"
              onClick={() => onIssueClick?.(issue)}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{categoryEmojis[issue.category]}</span>
                  <span className="font-semibold">{categoryLabels[issue.category]}</span>
                </div>
              </TableCell>
              <TableCell className="font-semibold">{issue.title}</TableCell>
              <TableCell>
                <StatusBadge status={issue.status} />
              </TableCell>
              <TableCell>
                <span className="neo-border-thick bg-neo-orange px-2 py-1 text-xs font-bold text-black">
                  {issue.priority.toUpperCase()}
                </span>
              </TableCell>
              <TableCell className="text-sm">
                {issue.latitude.toFixed(4)}, {issue.longitude.toFixed(4)}
              </TableCell>
              <TableCell>
                {issue.authorities && issue.authorities.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {issue.authorities.slice(0, 2).map((auth, idx) => (
                      <span
                        key={idx}
                        className="neo-border-thick bg-neo-yellow px-2 py-1 text-xs font-bold text-black"
                      >
                        {auth.split(' ')[0]}
                      </span>
                    ))}
                    {issue.authorities.length > 2 && (
                      <span className="text-xs font-bold text-gray-600">
                        +{issue.authorities.length - 2}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">None</span>
                )}
              </TableCell>
              <TableCell className="text-sm">
                {new Date(issue.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

