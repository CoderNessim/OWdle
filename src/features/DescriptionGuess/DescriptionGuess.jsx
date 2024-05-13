/* eslint-disable react-refresh/only-export-components */
import {
  Form,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from 'react-router-dom';
import { Button } from '@mantine/core';
import { useReducer, useState } from 'react';
import { useWindowSize } from 'react-use';
import { getRandomCharacter } from '../../services/apiOverwatch';
import NumAttempts from '../../ui/NumAttempts';
import styles from './DescriptionGuess.module.css';
import BackButton from '../../ui/BackButton';
import Confetti from 'react-confetti';
import Loader from '../../ui/Loader';

const numTries = 3;

const initialState = {
  userGuess: '',
  currentAttempt: 1,
  attempts: new Array(numTries).fill(''),
  correctness: new Array(numTries).fill(null),
};

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
    case 'winGame':
      return { ...state };
    case 'resetGame':
      return initialState;
    default:
      return state;
  }
}

export default function DescriptionGuess() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const character = useLoaderData();
  const revalidator = useRevalidator();
  const isRevalidatorLoading = revalidator.state === 'loading';
  const correctAnswer = character.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const navigate = useNavigate();
  const descriptionString = character.description.replaceAll(
    character.name,
    '__'
  );
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); 
  const { width, height } = useWindowSize();

  function handleSubmit(e) {
    e.preventDefault();
    if (!state.userGuess) return;

    const isCorrect = state.userGuess.toLowerCase() === correctAnswer;
    setIsAnswerCorrect(isCorrect);

    dispatch({
      type: 'setAttempt',
      payload: { guess: state.userGuess, correct: isCorrect },
    });

    if (isCorrect) {
      dispatch({ type: 'winGame' });
    } else {
      dispatch({ type: 'incrementAttempt' });
    }
  }

  function handleReset() {
    setIsAnswerCorrect(false);
    dispatch({ type: 'resetGame' });
    revalidator.revalidate();
  }

  return (
    <>
      {isAnswerCorrect && (
        <Confetti
          recycle={false}
          run={true}
          gravity={0.2}
          width={width}
          height={height}
        />
      )}
      {isRevalidatorLoading && <Loader />}
      <h1 className={styles.title}>Guess the Hero</h1>
      <div className={styles.description}>{descriptionString}</div>
      <Form className={styles.formContent} onSubmit={handleSubmit}>
        <NumAttempts
          state={state}
          dispatch={dispatch}
          isAnswerCorrect={isAnswerCorrect}
          style={styles.input}
        />
        {!isAnswerCorrect && state.currentAttempt <= numTries && (
          <Button type="submit" className={styles.button}>
            Guess
          </Button>
        )}
        {!isAnswerCorrect && state.currentAttempt > numTries && (
          <p>The correct answer was {character.name}</p>
        )}
      </Form>
      <div className={styles.buttonGroup}>
        <BackButton onClick={() => navigate(-1)} />
        <Button onClick={handleReset}>Play Again</Button>
      </div>
    </>
  );
}

export async function descriptionLoader() {
  const data = await getRandomCharacter();
  return data;
}
