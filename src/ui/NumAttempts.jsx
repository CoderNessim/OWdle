import { Stack, Select } from '@mantine/core';

function NumAttempts({ state, dispatch, isAnswerCorrect, style, selectArray }) {
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
          <Select
            clearable
            searchable
            key={i}
            variant="default"
            placeholder={`Attempt #${i + 1}`}
            disabled={state.currentAttempt !== i + 1 || isAnswerCorrect}
            searchValue={state.currentAttempt[i]}
            onSearchChange={(value) =>
              dispatch({ type: 'setUserGuess', payload: value })
            }
            className={style}
            style={inputStyle}
            data={selectArray}
            nothingFoundMessage="Nothing found..."
            maxDropdownHeight={200}
            comboboxProps={{
              position: 'bottom',
              middlewares: { flip: false, shift: false },
              offset: 0,
            }}
          />
        ) : null;
      })}
    </Stack>
  );
}

export default NumAttempts;
