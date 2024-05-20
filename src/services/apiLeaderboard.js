import supabase from './supabase';

export async function getLeaderboard(page = 1, limit = 5) {
  const startIndex = (page - 1) * limit;
  const { data, error, count } = await supabase
    .from('game_history')
    .select(`
      num_wins,
      num_losses,
      user_id,
      users(name, profile_picture) 
    `, { count: 'exact' })  // This tells Supabase to include a count of total rows in the response
    .order('num_wins', { ascending: false })
    .range(startIndex, startIndex + limit - 1);

  if (error) throw new Error(error.message);
  return { data, total: count };
}
