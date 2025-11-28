import { supabase } from './supabase';
import { Issue, CreateIssueInput, IssueStatus } from '../types/issue';

export async function getIssues(): Promise<Issue[]> {
  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching issues:', error);
    throw error;
  }

  return data || [];
}

export async function getIssueById(id: string): Promise<Issue | null> {
  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching issue:', error);
    return null;
  }

  return data;
}

export async function createIssue(input: CreateIssueInput): Promise<Issue> {
  const { data, error } = await supabase
    .from('issues')
    .insert({
      category: input.category,
      title: input.title,
      description: input.description,
      latitude: input.latitude,
      longitude: input.longitude,
      priority: input.priority || 'medium',
      reported_by: input.reported_by || null,
      image_url: input.image_url || null,
      authorities: input.authorities || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating issue:', error);
    throw error;
  }

  return data;
}

export async function updateIssueStatus(
  id: string,
  status: IssueStatus
): Promise<Issue> {
  const { data, error } = await supabase
    .from('issues')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating issue status:', error);
    throw error;
  }

  return data;
}

export async function assignIssue(
  id: string,
  assigned_to: string
): Promise<Issue> {
  const { data, error } = await supabase
    .from('issues')
    .update({ assigned_to })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error assigning issue:', error);
    throw error;
  }

  return data;
}

export async function deleteIssue(id: string): Promise<void> {
  const { error } = await supabase
    .from('issues')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting issue:', error);
    throw error;
  }
}

export async function updateIssue(
  id: string,
  updates: Partial<Issue>
): Promise<Issue> {
  const { data, error } = await supabase
    .from('issues')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating issue:', error);
    throw error;
  }

  return data;
}

