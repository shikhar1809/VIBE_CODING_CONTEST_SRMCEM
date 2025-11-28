// Detect category and priority from text using keyword matching

import { IssueCategory, IssuePriority } from '../types/issue';

const categoryKeywords: Record<IssueCategory, string[]> = {
  garbage: ['garbage', 'trash', 'waste', 'dump', 'rubbish', 'litter', 'cleanup', 'dirty', 'filth'],
  traffic: ['traffic', 'signal', 'light', 'congestion', 'jam', 'roadblock', 'intersection', 'crossing'],
  potholes: ['pothole', 'hole', 'road', 'damage', 'crack', 'bump', 'uneven', 'repair', 'asphalt'],
  water: ['water', 'leak', 'pipeline', 'supply', 'pressure', 'drainage', 'flood', 'sewage'],
  electricity: ['power', 'electricity', 'outage', 'cut', 'faulty', 'pole', 'wire', 'spark', 'blackout'],
  streetlights: ['streetlight', 'light', 'lamp', 'dark', 'illumination', 'bulb', 'broken light'],
};

const priorityKeywords: Record<IssuePriority, string[]> = {
  high: ['urgent', 'emergency', 'immediate', 'critical', 'dangerous', 'hazard', 'severe', 'serious'],
  medium: ['moderate', 'normal', 'regular', 'standard'],
  low: ['minor', 'small', 'slight', 'low priority'],
};

export function detectCategoryFromText(text: string): IssueCategory {
  const lowerText = text.toLowerCase();
  const scores: Record<IssueCategory, number> = {
    garbage: 0,
    traffic: 0,
    potholes: 0,
    water: 0,
    electricity: 0,
    streetlights: 0,
  };

  // Count keyword matches
  Object.entries(categoryKeywords).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        scores[category as IssueCategory]++;
      }
    });
  });

  // Return category with highest score, default to garbage
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return 'garbage';

  const detectedCategory = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0];
  return (detectedCategory as IssueCategory) || 'garbage';
}

export function detectPriorityFromText(text: string): IssuePriority {
  const lowerText = text.toLowerCase();
  
  for (const [priority, keywords] of Object.entries(priorityKeywords)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return priority as IssuePriority;
    }
  }

  return 'medium';
}

export function extractTitleFromText(text: string): string {
  // Extract first sentence or first 50 characters as title
  const sentences = text.split(/[.!?]/);
  const firstSentence = sentences[0]?.trim() || text;
  
  if (firstSentence.length <= 60) {
    return firstSentence;
  }
  
  return firstSentence.substring(0, 57) + '...';
}

