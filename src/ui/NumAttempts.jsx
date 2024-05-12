import { Stack, Input } from '@mantine/core'; // Ensure you import from '@mantine/core'

function NumAttempts({ maxGuesses, currentTry, setCurrentTry, userGuess, setUserGuess }) {

  return (
    <Stack align="stretch" justify="center" gap="md">
      {Array.from({ length: maxGuesses }).map((_, i) =>
        currentTry >= i + 1 ? (
          <Input
            key={i}
            variant="default"
            placeholder={`Attempt #${i + 1}`}
            name={`userGuess${i}`}
            disabled={currentTry != i + 1}
            value={currentTry === i + 1 && userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
          />
        ) : null
      )}
    </Stack>
  );
}

export default NumAttempts;
