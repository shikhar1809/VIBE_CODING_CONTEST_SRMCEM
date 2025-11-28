import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://liytxstvvyevnifjbnyj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpeXR4c3R2dnlldm5pZmpibnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyOTk5MTQsImV4cCI6MjA3OTg3NTkxNH0.fDRjALxcjucSpqos9gbQLMhxgo9tZaqGyftHvK5tqhs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

