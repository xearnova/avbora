/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qxudxkrghuvavdailsqk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4dWR4a3JnaHV2YXZkYWlsc3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2ODg1NzUsImV4cCI6MjA4NzI2NDU3NX0.KE5POwszW1qq9IRvs0aUAvxaZDw2KcvUquGMLuXDOdo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
