/* eslint-disable react-refresh/only-export-components */
import { Form, useNavigate, useRevalidator } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import NumAttempts from './NumAttempts';
import BackButton from '../../ui/BackButton';
import Confetti from 'react-confetti';
import Loader from '../../ui/Loader';
import { useGameReducer } from '../../hooks/useGameReducer';
import ModalWindow from './ModalWindow';
import { notifications } from '@mantine/notifications';
import styles from './GameLayout.module.css';

export default function GameLayout({
  correctAnswer,
  numTries,
  gamemode,
  gameContent,
  selectArray,
  question,
  imageQuestion,
  portrait,
}) {
  const { state, dispatch } = useGameReducer(numTries);
  const revalidator = useRevalidator();
  const isRevalidatorLoading = revalidator.state === 'loading';
  const navigate = useNavigate();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.attempts, dispatch, isAnswerCorrect]);

  function handleReset() {
    revalidator.revalidate();
    setIsAnswerCorrect(false);
    dispatch({ type: 'resetGame' });
  }

  return (
    <>
      {isAnswerCorrect && (
        <>
          <ModalWindow
            closeModal={closeModal}
            question={question}
            correctAnswer={correctAnswer}
            portraitLink={portrait}
            isWin={true}
            state={state}
            gamemode={gamemode}
            imageQuestion={imageQuestion}
          />
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
      {gameContent}
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
            <p>
              The correct answer was{' '}
              {correctAnswer[0].toUpperCase() + correctAnswer.slice(1)}
            </p>
            <ModalWindow
              closeModal={closeModal}
              question={question}
              correctAnswer={correctAnswer}
              portraitLink={portrait}
              isWin={false}
              state={state}
              gamemode={gamemode}
              imageQuestion={imageQuestion}
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
