import {
  Modal,
  Text,
  List,
  ListItem,
  Box,
  Divider,
  useMantineTheme,
} from '@mantine/core';
import Copy from './Copy';
import { useGameHistory } from '../hooks/useGameHistory';
import { useEffect } from 'react';

function ModalWindow({
  closeModal,
  question,
  isWin,
  state,
  correctAnswer,
  portraitLink,
}) {
  const theme = useMantineTheme();
  const { mutate, gameHistory, user } = useGameHistory();

  const copyContent = `
    Question: ${question}
    Attempts:
    ${state.attempts
      .map(
        (attempt, index) =>
          `Attempt #${index + 1}: ${attempt} ${
            attempt.toLowerCase() === correctAnswer ? '🟩' : '🟥'
          }`
      )
      .join('\n')}
    Correct Answer: ${correctAnswer}
  `;
  useEffect(() => {
    if (state.showModal && user) {
      mutate({
        isWin,
        id: user?.id,
        currentGameHistory: gameHistory,
        attempts: state?.attempts,
        correctAnswer,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.showModal]);

  return (
    <Modal
      title="Results:"
      opened={state.showModal}
      onClose={() => closeModal()}
      overlayOpacity={0.55}
      overlayBlur={2}
      size="lg" // Larger modal size
    >
      <Text size="md" weight={500} style={{ marginBottom: theme.spacing.sm }}>
        {question}
      </Text>

      <Text weight={500} style={{ marginBottom: theme.spacing.xs }}>
        Your attempts:
      </Text>
      <List withPadding>
        {state.attempts.map((attempt, index) => (
          <ListItem key={index}>
            <Text
              span
              color={`${
                attempt.toLowerCase() === correctAnswer
                  ? theme.colors.green[6]
                  : theme.colors.red[6]
              }`}
            >
              Attempt #{index + 1}: {attempt}
            </Text>
          </ListItem>
        ))}
      </List>

      <Divider style={{ margin: `${theme.spacing.md}px 0` }} />

      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text>
          The correct answer was:{' '}
          <a href={portraitLink} target="_blank" rel="noopener noreferrer">
            {correctAnswer[0].toUpperCase() + correctAnswer.slice(1)}
          </a>
        </Text>
        <Copy copyContent={copyContent} />
      </Box>

      <Text
        color={`${isWin ? 'green' : 'red'}`}
        align="center"
        style={{ marginTop: theme.spacing.md }}
      >
        {isWin ? 'You won! 🥳' : 'Sorry, you lose! 😔'}
      </Text>
    </Modal>
  );
}

export default ModalWindow;
