import { Button } from '../ui/button';
import { Issue } from '../../types/issue';

interface AdminActionsProps {
  issue: Issue;
  onStatusChange: (issueId: string, status: Issue['status']) => void;
  onAssign: (issueId: string, assignedTo: string) => void;
  onDelete: (issueId: string) => void;
}

export function AdminActions({ issue, onStatusChange, onAssign, onDelete }: AdminActionsProps) {
  return (
    <div className="flex gap-2">
      {issue.status !== 'pending' && (
        <Button
          onClick={() => onStatusChange(issue.id, 'pending')}
          className="neo-button bg-neo-yellow text-black text-xs"
        >
          Pending
        </Button>
      )}
      {issue.status !== 'in_progress' && (
        <Button
          onClick={() => onStatusChange(issue.id, 'in_progress')}
          className="neo-button bg-neo-cyan text-black text-xs"
        >
          In Progress
        </Button>
      )}
      {issue.status !== 'resolved' && (
        <Button
          onClick={() => onStatusChange(issue.id, 'resolved')}
          className="neo-button bg-neo-green text-black text-xs"
        >
          Resolved
        </Button>
      )}
      <Button
        onClick={() => {
          const assigned = prompt('Assign to:');
          if (assigned) {
            onAssign(issue.id, assigned);
          }
        }}
        className="neo-button bg-neo-purple text-white text-xs"
      >
        Assign
      </Button>
      <Button
        onClick={() => {
          if (confirm('Delete this issue?')) {
            onDelete(issue.id);
          }
        }}
        className="neo-button bg-red-500 text-white text-xs"
      >
        Delete
      </Button>
    </div>
  );
}

