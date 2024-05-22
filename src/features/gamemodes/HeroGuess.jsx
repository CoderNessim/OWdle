import { useLoaderData } from 'react-router-dom';
import { getRandomCharacter } from '../../services/apiOverwatch';
import GameContent from '../../ui/GameContent';
import GameLayout from '../GameLayout/GameLayout';
import styles from './HeroGuess.module.css';
import { useState } from 'react';

function HeroGuess() {
  const { data: character, selectArray } = useLoaderData();
  const [currentAttempt, setCurrentAttempt] = useState(1);
  const correctAnswer = character.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const numTries = 5;
  const gamemode = 'Stats Guess';
  const gameContent = (
    <GameContent gamemodeName="Stats">
      <div className={styles.characterStats}>
        <div>
          <span>Health: {character.hitpoints.health}</span>
          <span>Armor: {character.hitpoints.armor}</span>
          <span>Shield: {character.hitpoints.shields}</span>
        </div>
        <div style={{ paddingTop: '5px' }}>
          {currentAttempt >= 2 && <span>Role: {character.role}</span>}
          {currentAttempt >= 3 && <span>Age: {character.age}</span>}
          {currentAttempt >= 4 && (
            <span>Location: {character.location.split(',')[0]}</span>
          )}
        </div>
      </div>
    </GameContent>
  );
  return (
    <GameLayout
      correctAnswer={correctAnswer}
      numTries={numTries}
      gamemode={gamemode}
      gameContent={gameContent}
      selectArray={selectArray}
      question={character.name}
      portrait={character.portrait}
      setCurrentAttempt={setCurrentAttempt}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function heroGuessLoader() {
  const { data, selectArray } = await getRandomCharacter();
  return { data, selectArray };
}

export default HeroGuess;
