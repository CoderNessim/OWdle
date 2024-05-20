// Profile.js
import { Avatar } from '@mantine/core';
import styles from './Profile.module.css';

function Profile({ profileData, rank }) {
  //      ? ((gameHistory.num_wins / totalGames) * 100).toFixed(2)
  // const winRate =
  //   totalGames > 0
  //     ? ((gameHistory.num_wins / totalGames) * 100).toFixed(2)
  //     : 'N/A';
  const totalGames = profileData.num_wins + profileData.num_losses;
  const winRate = ((profileData.num_wins / totalGames) * 100).toFixed(2);
  console.log(profileData)
  return (
    <div className={styles.profile}>
      <div className={styles.rankUser}>
        <span>{rank}</span>
        <Avatar  alt="profile" className={styles.avatar} src={profileData.users.profile_picture} />
        <span>{profileData.users.name}</span>
      </div>
      <div className={styles.winStats}>
        <span>{winRate}%</span>
        <span>{profileData.num_wins}</span>
      </div>
    </div>
  );
}

export default Profile;
