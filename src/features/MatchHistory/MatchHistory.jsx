import { Loader, Title, Stack, Pagination } from '@mantine/core';
import { useGameHistory } from '../../hooks/useGameHistory';
import NoMatchHistory from './NoMatchHistory';
import Match from './Match';
import styles from './MatchHistory.module.css';
import { useSearchParams } from 'react-router-dom';

function MatchHistory() {
  const { gameHistory, isPending } = useGameHistory();
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 3;

  if (isPending) return <Loader />;
  if (!gameHistory?.games?.length) return <NoMatchHistory />;

  const currentPage = parseInt(searchParams.get('page')) || 1;

  const parsedGameHistory = JSON.parse(gameHistory.games);

  const totalGames = parsedGameHistory.length;
  const totalPages = Math.ceil(totalGames / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGames = parsedGameHistory.slice(startIndex, endIndex);

  function handlePageChange(page) {
    setSearchParams({ page });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.matchHistory}>
        <Title order={2} className={styles.title}>
          Match History
        </Title>
        <Stack className={styles.matchStack}>
          {currentGames.map((game, index) => (
            <Match key={index} game={game} />
          ))}
        </Stack>
      </div>
      <Pagination
        total={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default MatchHistory;
