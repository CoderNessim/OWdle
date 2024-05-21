import { Loader, Title, Stack, Pagination } from '@mantine/core';
import { useGameHistory } from '../../hooks/useGameHistory';
import NoMatchHistory from './NoMatchHistory';
import Match from './Match';
import styles from './MatchHistory.module.css';

function MatchHistory() {
  const { gameHistory, isPending } = useGameHistory();
  if (isPending) return <Loader />;
  if (!gameHistory?.games?.length) return <NoMatchHistory />;

  const parsedGameHistory = JSON.parse(gameHistory.games);

  return (
    <div className={styles.wrapper}>
      <div className={styles.matchHistory}>
        <Title order={2} className={styles.title}>
          Match History
        </Title>
        <Stack className={styles.matchStack}>
          {parsedGameHistory.map((game, index) => (
            <Match key={index} game={game} />
          ))}
        </Stack>
      </div>
      <Pagination />
    </div>
  );
}

export default MatchHistory;
