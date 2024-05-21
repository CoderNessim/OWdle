import { Badge, Card, Group, Text } from '@mantine/core';
import styles from './Match.module.css';

function Match({ game }) {
  const attempts = game.attempts.filter((attempt) => attempt !== '');
  return (
    <Card shadow="sm" p="lg" className={styles.card}>
      <Text size="md" className={styles.textDate}>
        Played on: <span className={styles.playedOn}>{game.timePlayed}</span>
        <Badge
          color={game.isWin ? 'green' : 'red'}
          variant="light"
          className={styles.badge}
        >
          {game.isWin ? 'Win' : 'Loss'}
        </Badge>
      </Text>
      <Group position="apart" className={styles.group}>
        <Text size="md">
          Game Mode: <Badge>{game.gamemode}</Badge>
        </Text>
        <Text size="md">
          Correct Answer: <Badge>{game.correctAnswer}</Badge>
        </Text>
      </Group>
      <Text size="md" className={styles.attemptsText}>
        Attempts: {attempts.join(', ') || 'No attempts'}
      </Text>
    </Card>
  );
}

export default Match;
