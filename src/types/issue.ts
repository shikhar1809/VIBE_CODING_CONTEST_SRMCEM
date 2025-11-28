export type IssueCategory = 'garbage' | 'traffic' | 'potholes' | 'water' | 'electricity' | 'streetlights';
export type IssueStatus = 'pending' | 'in_progress' | 'resolved';
export type IssuePriority = 'low' | 'medium' | 'high';

export interface Issue {
  id: string;
  category: IssueCategory;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  status: IssueStatus;
  priority: IssuePriority;
  reported_by?: string | null;
  assigned_to?: string | null;
  image_url?: string | null;
  authorities?: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface CreateIssueInput {
  category: IssueCategory;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  priority?: IssuePriority;
  reported_by?: string;
  image_url?: string;
  authorities?: string[];
}

export const categoryEmojis: Record<IssueCategory, string> = {
  garbage: '🗑️',
  traffic: '🚦',
  potholes: '🕳️',
  water: '💧',
  electricity: '⚡',
  streetlights: '💡',
};

export const categoryLabels: Record<IssueCategory, string> = {
  garbage: 'Garbage/Waste',
  traffic: 'Traffic Lights',
  potholes: 'Roads/Potholes',
  water: 'Water Supply',
  electricity: 'Electricity',
  streetlights: 'Street Lights',
};

