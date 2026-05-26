import { supabase } from './supabase'

// Sign in with Google
export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: typeof window !== 'undefined' ? window.location.origin : '',
    }
  })
  if (error) console.error('Login error:', error)
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Signout error:', error)
}

// Get current user
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Get or create profile
export async function getOrCreateProfile(user) {
  if (!user) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !data) {
    const { data: newProfile } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        username: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
        avatar_url: user.user_metadata?.avatar_url || null,
      })
      .select()
      .single()
    return newProfile
  }
  return data
}

// Record a game result and update streak
export async function recordGameResult({ userId, category, won }) {
  if (!userId) return

  // Get existing streak record
  const { data: existing } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .eq('category', category)
    .single()

  const today = new Date().toISOString().split('T')[0]

  if (existing) {
    // Check if already played today
    if (existing.last_played === today) return

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    // Calculate new streak
    let newStreak = won
      ? (existing.last_played === yesterdayStr ? existing.current_streak + 1 : 1)
      : 0

    const newBest = Math.max(newStreak, existing.best_streak)

    await supabase
      .from('streaks')
      .update({
        current_streak: newStreak,
        best_streak: newBest,
        total_wins: won ? existing.total_wins + 1 : existing.total_wins,
        total_played: existing.total_played + 1,
        last_played: today,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('category', category)
  } else {
    // First time playing this category
    await supabase
      .from('streaks')
      .insert({
        user_id: userId,
        category,
        current_streak: won ? 1 : 0,
        best_streak: won ? 1 : 0,
        total_wins: won ? 1 : 0,
        total_played: 1,
        last_played: today,
      })
  }
}

// Get leaderboard for all categories
export async function getLeaderboard() {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('best_streak', { ascending: false })
    .limit(100)

  if (error) { console.error('Leaderboard error:', error); return [] }
  return data || []
}

// Get a user's stats across all categories
export async function getUserStats(userId) {
  if (!userId) return []
  const { data, error } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)

  if (error) { console.error('Stats error:', error); return [] }
  return data || []
}