import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getRandomCharacter } from '../../services/apiOverwatch';
import GameContent from '../../ui/GameContent';
import GameLayout from '../GameLayout/GameLayout';

function ImageGuess() {
  const { data: character, selectArray } = useLoaderData();
  const [backgroundPos, setBackgroundPos] = useState('50% 50%');
  const correctAnswer = character.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  useEffect(() => {
    const randomX = Math.floor(Math.random() * 100);
    const randomY = Math.floor(Math.random() * 100);
    setBackgroundPos(`${randomX}% ${randomY}%`);
  }, [character.portrait]);

  const imageStyle = {
    width: '200px',
    height: '200px',
    backgroundImage: `url(${character.portrait})`,
    backgroundSize: '500% 500%',
    backgroundPosition: backgroundPos,
    backgroundRepeat: 'no-repeat',
    borderRadius: '5px',
  };

  return (
    <GameLayout
      correctAnswer={correctAnswer}
      numTries={3}
      gamemode="Ability Guess"
      gameContent={
        <GameContent gamemodeName="Hero's Splash Art" contentWidth="300px">
          <div style={imageStyle} />
        </GameContent>
      }
      selectArray={selectArray}
      question={character.portrait}
      portrait={character.portrait}
      imageQuestion={<div style={imageStyle} />}
      isImageGuess={true}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function imageLoader() {
  const { data, selectArray } = await getRandomCharacter();
  return { data, selectArray };
}

export default ImageGuess;
