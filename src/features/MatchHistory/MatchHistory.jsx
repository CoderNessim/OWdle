import { Loader } from '@mantine/core';
import { useGameHistory } from '../../hooks/useGameHistory';
import NoMatchHistory from './NoMatchHistory';

function MatchHistory() {
  const { gameHistory, isPending } = useGameHistory();
  if (isPending) return <Loader />;
  if(!gameHistory?.games?.length) return <NoMatchHistory />

  const parsedGameHistory = JSON.parse(gameHistory.games);
  console.log(parsedGameHistory);
  return <div>Match History</div>;
}

export default MatchHistory;
