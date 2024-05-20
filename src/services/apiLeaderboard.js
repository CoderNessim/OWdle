import supabase from './supabase';

export async function getLeaderboard() {
  const { data, error } = await supabase
    .from('game_history')
    .select('num_wins, num_losses, user_id, users(name, profile_picture)')
    .order('num_wins', { ascending: false })
  if (error) throw new Error(error.message);
  return data;
}
