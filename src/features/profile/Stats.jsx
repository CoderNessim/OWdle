import { Card, Text } from '@mantine/core';
import { useGameHistory } from '../../hooks/useGameHistory';
import { useQuery } from '@tanstack/react-query';
import { getRank } from '../../services/apiGameHistory';
import { Link } from 'react-router-dom';

function Stats() {
  const { gameHistory, isPending: isGameHistoryPending } = useGameHistory();
  const { data: rank, isPending: isRankPending } = useQuery({
    queryKey: ['rank'],
    queryFn: () => getRank(gameHistory?.user_id),
  });
  const totalGames = gameHistory
    ? gameHistory.num_wins + gameHistory.num_losses
    : 0;
  const winRate =
    totalGames > 0
      ? ((gameHistory.num_wins / totalGames) * 100).toFixed(2)
      : 'N/A';

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ marginBottom: '20px' }}
    >
      <Text size="lg" style={{ marginBottom: 10 }}>
        Stats
      </Text>
      {!isGameHistoryPending && gameHistory ? (
        <>
          <Text>Wins: {gameHistory.num_wins}</Text>
          <Text>Losses: {gameHistory.num_losses}</Text>
          <Text>Win rate: {winRate}%</Text>
          <Text>
            Leaderboard Ranking:
            <Link to={`/app/leaderboard?page=${Math.ceil(rank / 5)}`} style={{marginLeft: '4px'}}>
              {isRankPending ? 'Loading...' : rank}
            </Link>
          </Text>
        </>
      ) : (
        <Text>Loading stats...</Text>
      )}
    </Card>
  );
}

export default Stats;
