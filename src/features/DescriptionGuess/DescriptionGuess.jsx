/* eslint-disable react-refresh/only-export-components */
import { Form, useLoaderData, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Button, Input } from '@mantine/core';
import { getRandomCharacter } from '../../services/apiOverwatch';
import styles from './DescriptionGuess.module.css';
import NumAttempts from '../../ui/NumAttempts';
import { useState } from 'react';

export default function DescriptionGuess() {
  const character = useLoaderData();
  const navigate = useNavigate();
  const descriptionString = character.description.replaceAll(
    character.name,
    '__'
  );
  console.log(character);
  const numTries = 3;
  const [currentTry, setCurrentTry] = useState(1);
  const [userGuess, setUserGuess] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (currentTry >= numTries) return;
    setCurrentTry(currentTry + 1);
    setUserGuess('');
  }

  return (
    <>
      <h1 className={styles.title}>Guess the Hero</h1>
      <div className={styles.description}>{descriptionString}</div>
      <div className={styles.formContainer}>
        <Form className={styles.formContent} method="POST">
          <NumAttempts
            maxGuesses={numTries}
            currentTry={currentTry}
            setCurrentTry={setCurrentTry}
            userGuess={userGuess}
            setUserGuess={setUserGuess}
          />
          <Input type="hidden" name="currentTry" value={currentTry} />
          <Input type="hidden" name="numTries" value={numTries} />
          <Input type="hidden" name="characterName" value={character.name} />
          <Button
            type="submit"
            className={styles.button}
            onClick={handleSubmit}
          >
            Submit Guess
          </Button>
        </Form>
      </div>
      <Button onClick={() => navigate(-1)} className={styles.backButton}>
        <IoArrowBackOutline />
        Back
      </Button>
    </>
  );
}

export async function descriptionLoader() {
  const data = await getRandomCharacter();
  return data;
}

export async function descriptionAction({ request }) {
  const formData = await request.formData();
  const userGuess = formData.get('userGuess'); // Assuming there's an input named 'userGuess'
  console.log(userGuess);
  return { userGuess };
}

// function checkUserGuess(guess) {
//   // Suppose we have access to the correct answer in the session or some other way
//   const correctAnswer = "CorrectCharacterName"; // This would typically not be hardcoded
//   return guess.toLowerCase() === correctAnswer.toLowerCase();
// }
