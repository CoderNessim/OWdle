import { Stack, Input } from '@mantine/core';

function NumAttempts({ state, dispatch, isAnswerCorrect, style }) {
  return (
    <Stack align="stretch" justify="center" gap="md">
      {state.attempts.map((_, i) => {
        let inputStyle = {
          backgroundColor:
            state.correctness[i] === 'correct'
              ? 'green'
              : state.correctness[i] === 'incorrect'
              ? 'red'
              : 'black',
          borderColor:
            state.correctness[i] === 'correct'
              ? 'green'
              : state.correctness[i] === 'incorrect'
              ? 'red'
              : 'grey',
        };

        return state.currentAttempt > i ? (
          <Input
            key={i}
            variant="default"
            placeholder={`Attempt #${i + 1}`}
            disabled={state.currentAttempt !== i + 1 || isAnswerCorrect}
            value={state.currentAttempt[i]}
            onChange={(e) =>
              dispatch({ type: 'setUserGuess', payload: e.currentTarget.value })
            }
            className={style}
            style={inputStyle}
          />
        ) : null;
      })}
    </Stack>
  );
}

export default NumAttempts;

//state.currentAttempt[i]
