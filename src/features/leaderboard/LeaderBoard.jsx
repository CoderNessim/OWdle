import { useLoaderData } from 'react-router-dom';
import { getLeaderboard } from '../../services/apiLeaderboard';
import styles from './LeaderBoard.module.css';
import Profile from './Profile';

export default function LeaderBoard() {
  const accounts = useLoaderData();

  return (
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
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

export async function LeaderBoardLoader() {
  const profiles = await getLeaderboard();
  return profiles;
}
