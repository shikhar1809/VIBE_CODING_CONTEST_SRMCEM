import { supabase } from './supabase';
import { demoIssues } from './demo-data';

export async function seedDemoData() {
  try {
    // Check if data already exists
    const { data: existingData, error: checkError } = await supabase
      .from('issues')
      .select('id')
      .limit(1);

    // If table doesn't exist, skip seeding (user needs to run SQL first)
    if (checkError && checkError.code === 'PGRST116') {
      console.warn('Issues table does not exist. Please run the SQL schema from src/lib/db-schema.sql in Supabase first.');
      return;
    }

    if (existingData && existingData.length > 0) {
      console.log('Demo data already exists. Skipping seed.');
      return;
    }

    // Insert demo issues
    const { data, error } = await supabase
      .from('issues')
      .insert(demoIssues)
      .select();

    if (error) {
      console.error('Error seeding demo data:', error);
      // Don't throw - allow app to continue even if seeding fails
      return;
    }

    console.log(`Successfully seeded ${data?.length || 0} demo issues`);
    return data;
  } catch (error) {
    console.error('Failed to seed demo data:', error);
    // Don't throw - allow app to continue
  }
}
