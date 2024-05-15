/* eslint-disable react-refresh/only-export-components */
import {
  Form,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from 'react-router-dom';
import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import { getRandomCharacter } from '../../services/apiOverwatch';
import NumAttempts from '../../ui/NumAttempts';
import BackButton from '../../ui/BackButton';
import Confetti from 'react-confetti';
import Loader from '../../ui/Loader';
import { useGameReducer } from '../../hooks/useGameReducer';
import ModalWindow from '../../ui/ModalWindow';
import { notifications } from '@mantine/notifications';
import styles from './GameLayout.module.css'
const numTries = 3;

export default function GameLayout() {
  const { state, dispatch } = useGameReducer(numTries);
  const { data: character, selectArray } = useLoaderData();
  const revalidator = useRevalidator();
  const isRevalidatorLoading = revalidator.state === 'loading';
  const correctAnswer = character.name.toLowerCase();
  const navigate = useNavigate();
  const descriptionString = character.description.replaceAll(
    character.name,
    '__'
  );
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const { width, height } = useWindowSize();
  const closeModal = () => {
    dispatch({ type: 'closeModal' });
  };
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

      if (state.currentAttempt !== numTries) {
        notifications.show({
          title: `${numTries - state.currentAttempt} Attempts Remaining`,
          autoClose: 1000,
        });
      }
    }
  }

  //only way ive gotten modal to close after a loss is using this useEffect hook
  useEffect(() => {
    if (state.attempts[numTries - 1] && !isAnswerCorrect) {
      dispatch({ type: 'loseGame' });
    }
  }, [state.attempts, dispatch, isAnswerCorrect]);

  function handleReset() {
    revalidator.revalidate();
    setIsAnswerCorrect(false);
    dispatch({ type: 'resetGame' });
  }
  console.log(state.attempts);

  return (
    <>
      {isAnswerCorrect && (
        <>
          <ModalWindow
            closeModal={closeModal}
            question={descriptionString}
            correctAnswer={correctAnswer}
            portraitLink={character.portrait}
            isWin={true}
            state={state}
          />{' '}
          <Confetti
            recycle={false}
            run={true}
            gravity={0.2}
            width={width}
            height={height}
          />
        </>
      )}
      {isRevalidatorLoading && <Loader />}
      <h1 className={styles.title}>Guess the Description</h1>
      <div className={styles.description}>{descriptionString}</div>
      <Form className={styles.formContent} onSubmit={handleSubmit}>
        <NumAttempts
          state={state}
          dispatch={dispatch}
          isAnswerCorrect={isAnswerCorrect}
          style={styles.input}
          selectArray={selectArray}
        />

        {!isAnswerCorrect && state.currentAttempt <= numTries && (
          <Button type="submit" className={styles.button}>
            Guess
          </Button>
        )}

        {!isAnswerCorrect && state.currentAttempt > numTries && (
          <>
            <p>The correct answer was {character.name}</p>
            <ModalWindow
              closeModal={closeModal}
              question={descriptionString}
              correctAnswer={correctAnswer}
              portraitLink={character.portrait}
              isWin={false}
              state={state}
            />
          </>
        )}
      </Form>
      <div className={styles.buttonGroup}>
        <BackButton onClick={() => navigate(-1)} />
        <Button onClick={handleReset} className={styles.playAgain}>
          Play Again
        </Button>
      </div>
    </>
  );
}

export async function descriptionLoader() {
  const { data, selectArray } = await getRandomCharacter();
  console.log(data)
  return { data, selectArray };
}
