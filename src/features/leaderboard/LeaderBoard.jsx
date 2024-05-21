import { useLoaderData, useSearchParams } from 'react-router-dom';
import { getLeaderboard } from '../../services/apiLeaderboard';
import styles from './LeaderBoard.module.css';
import Profile from './Profile';
import { Pagination } from '@mantine/core';

export default function LeaderBoard() {
  const { data: accounts, total } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = searchParams.get('page') || 1;
  function handlePageChange(page) {
    setSearchParams({ page });
  }
console.log(activePage)
  return (
    <>
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          <h2 className={styles.leaderboardTitle}>Leaderboard</h2>
          <div className={styles.headers}>
            <div className={styles.rankUser}>
              <span>Rank</span>
              <span>User</span>
            </div>
            <div className={styles.winStats}>
              <span>Win %</span>
              <span># Wins</span>
            </div>
          </div>
          {accounts.map((account, index) => (
            <Profile
              key={index}
              profileData={account}
              rank={5 * (activePage-1) + index + 1}
            />
          ))}
        </div>
        <Pagination
          total={Math.ceil(total / 5)}
          value={Number(activePage)}
          onChange={handlePageChange}
          style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
        />
      </div>
    </>
  );
}

export async function LeaderBoardLoader({ request }) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = 5;
  return getLeaderboard(page, limit);
}
