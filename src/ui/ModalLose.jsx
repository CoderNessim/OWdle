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

function ModalLose({
  showModal,
  closeModal,
  question,
  attempts,
  correctAnswer,
  portraitLink,
}) {
  const theme = useMantineTheme();

  const copyContent = `
    Question: ${question}
    Attempts:
    ${attempts
      .map((attempt, index) => `Attempt #${index + 1}: ${attempt} 🟥`)
      .join('\n')}
    Correct Answer: ${correctAnswer}
  `;

  return (
    <Modal
      title="Results:"
      opened={showModal}
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
        {attempts.map((attempt, index) => (
          <ListItem key={index}>
            <Text span color={theme.colors.red[6]}>
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
            {correctAnswer}
          </a>
        </Text>
        <Copy copyContent={copyContent} />
      </Box>

      <Text color="red" align="center" style={{ marginTop: theme.spacing.md }}>
        Sorry, you lose! 😔
      </Text>
    </Modal>
  );
}

export default ModalLose;
