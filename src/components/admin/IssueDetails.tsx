import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Issue, categoryEmojis, categoryLabels } from '../../types/issue';
import { StatusBadge } from './StatusBadge';
import { Button } from '../ui/button';

interface IssueDetailsProps {
  issue: Issue | null;
  open: boolean;
  onClose: () => void;
  onStatusChange?: (issueId: string, status: Issue['status']) => void;
  onAssign?: (issueId: string, assignedTo: string) => void;
  onDelete?: (issueId: string) => void;
}

export function IssueDetails({
  issue,
  open,
  onClose,
  onStatusChange,
  onDelete,
}: IssueDetailsProps) {
  if (!issue) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="neo-window max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-3xl">{categoryEmojis[issue.category]}</span>
            {issue.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-black mb-2">Description</h3>
            <p className="neo-border-thick bg-gray-50 p-3">{issue.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-black mb-2">Category</h3>
              <p className="neo-border-thick bg-white p-2">{categoryLabels[issue.category]}</p>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">Status</h3>
              <StatusBadge status={issue.status} />
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">Priority</h3>
              <span className="neo-border-thick bg-neo-orange px-3 py-1 text-sm font-bold text-black">
                {issue.priority.toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">Location</h3>
              <p className="text-sm">
                {issue.latitude.toFixed(6)}, {issue.longitude.toFixed(6)}
              </p>
            </div>
          </div>

          {issue.reported_by && (
            <div>
              <h3 className="font-bold text-black mb-2">Reported By</h3>
              <p>{issue.reported_by}</p>
            </div>
          )}

          {issue.assigned_to && (
            <div>
              <h3 className="font-bold text-black mb-2">Assigned To</h3>
              <p>{issue.assigned_to}</p>
            </div>
          )}

          {issue.authorities && issue.authorities.length > 0 && (
            <div>
              <h3 className="font-bold text-black mb-2">Tagged Authorities</h3>
              <div className="flex flex-wrap gap-2">
                {issue.authorities.map((auth, index) => (
                  <span
                    key={index}
                    className="neo-border-thick bg-neo-yellow px-3 py-1 text-sm font-bold text-black"
                  >
                    {auth}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            {onStatusChange && (
              <>
                {issue.status !== 'pending' && (
                  <Button
                    onClick={() => onStatusChange(issue.id, 'pending')}
                    className="neo-button bg-neo-yellow text-black"
                  >
                    Mark Pending
                  </Button>
                )}
                {issue.status !== 'in_progress' && (
                  <Button
                    onClick={() => onStatusChange(issue.id, 'in_progress')}
                    className="neo-button bg-neo-cyan text-black"
                  >
                    Mark In Progress
                  </Button>
                )}
                {issue.status !== 'resolved' && (
                  <Button
                    onClick={() => onStatusChange(issue.id, 'resolved')}
                    className="neo-button bg-neo-green text-black"
                  >
                    Mark Resolved
                  </Button>
                )}
              </>
            )}
            {onDelete && (
              <Button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this issue?')) {
                    onDelete(issue.id);
                    onClose();
                  }
                }}
                className="neo-button bg-red-500 text-white ml-auto"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

