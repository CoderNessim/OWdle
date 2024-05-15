import { notifications } from '@mantine/notifications';
import supabase from './supabase';

export async function uploadGame({
  isWin,
  id,
  currentGameHistory,
  attempts,
  correctAnswer,
}) {
  console.log('Current Game History:', currentGameHistory);

  let parsedGameHistory = [];
  if (currentGameHistory && currentGameHistory.games) {
    try {
      parsedGameHistory = JSON.parse(currentGameHistory.games);
    } catch (error) {
      notifications.show({
        title: 'Failed to parse game history',
        message: error.message,
        color: 'red',
      });
    }
  }
  parsedGameHistory.push({
    timePlayed: new Date().toISOString(),
    correctAnswer: correctAnswer,
    isWin: isWin,
    numAttempts: attempts?.length || 0,
    attempts: attempts || [],
    gamemode: 'description guess'
  });

  console.log('Updated Game History:', parsedGameHistory);
  const updatedGameHistoryJSON = JSON.stringify(parsedGameHistory);

  const { data: history, error } = await supabase
    .from('game_history')
    .update({
      num_wins: isWin
        ? (currentGameHistory?.num_wins || 0) + 1
        : currentGameHistory?.num_wins,
      num_losses: !isWin
        ? (currentGameHistory?.num_losses || 0) + 1
        : currentGameHistory?.num_losses,
      games: updatedGameHistoryJSON,
    })
    .eq('user_id', id)
    .select();

  if (error) {
    console.error('Failed to update game history:', error.message);
    throw new Error(error.message);
  }

  const gameHistory = await getGameHistory(id);

  console.log('History Data Returned:', history);
  console.log(gameHistory);
  return gameHistory;
}

export async function getGameHistory(id) {
  let { data: gameHistory, error: gameHistoryError } = await supabase
    .from('game_history')
    .select('*')
    .eq('user_id', id)
    .single();

  if (gameHistoryError) throw new Error(gameHistoryError.message);

  return gameHistory;
}
