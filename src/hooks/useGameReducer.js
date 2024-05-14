import { useReducer } from 'react';

function createInitialState(numTries) {
  return {
    userGuess: '',
    currentAttempt: 1,
    attempts: new Array(numTries).fill(''),
    correctness: new Array(numTries).fill(null),
    showModal: false,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'setUserGuess':
      return { ...state, userGuess: action.payload };
    case 'setAttempt': {
      const newAttempts = [...state.attempts];
      const newCorrectness = [...state.correctness];
      newAttempts[state.currentAttempt - 1] = action.payload.guess;
      newCorrectness[state.currentAttempt - 1] = action.payload.correct
        ? 'correct'
        : 'incorrect';
      return {
        ...state,
        attempts: newAttempts,
        correctness: newCorrectness,
        userGuess: '',
      };
    }
    case 'incrementAttempt':
      return { ...state, currentAttempt: state.currentAttempt + 1 };
    case 'closeModal':
      return { ...state, showModal: false };
    case 'winGame':
      return { ...state, showModal: true };
    case 'loseGame':
      return { ...state, showModal: true };
    case 'resetGame':
      return createInitialState(state.attempts.length);
    default:
      return state;
  }
}

export function useGameReducer(numTries) {
  const initialState = createInitialState(numTries); // Create an initial state with the desired number of attempts
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
}
