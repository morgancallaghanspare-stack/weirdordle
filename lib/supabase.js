import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hovmmdotmtoojyqrunnc.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhvdm1tZG90bXRvb2p5cXJ1bm5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MTE5NjgsImV4cCI6MjA5NTM4Nzk2OH0.tkwEJSJwzBiES00zlYlIk8tfxA7-K3hNjhOSq7csAiU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)