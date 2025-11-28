import { useState, useEffect } from 'react';
import { Issue } from '../types/issue';
import { getIssues } from '../lib/issue-service';

export function useIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      setLoading(true);
      const data = await getIssues();
      setIssues(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load issues'));
      console.error('Error loading issues:', err);
    } finally {
      setLoading(false);
    }
  };

  return { issues, loading, error, refetch: loadIssues };
}

