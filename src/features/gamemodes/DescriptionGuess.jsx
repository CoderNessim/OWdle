import { useLoaderData } from 'react-router-dom';
import { getRandomCharacter } from '../../services/apiOverwatch';
import GameLayout from '../GameLayout/GameLayout';
import GameContent from '../../ui/GameContent';

function DescriptionGuess() {
  const { data: character, selectArray } = useLoaderData();
  const correctAnswer = character.name.toLowerCase();
  const numTries = 3;
  const gamemode = 'Description Guess';
  const descriptionString = character.description.replaceAll(
    character.name,
    '__'
  );
  const gameContent = (
    <GameContent gamemodeName="Description">{descriptionString}</GameContent>
  );

  return (
    <GameLayout
      correctAnswer={correctAnswer}
      numTries={numTries}
      gamemode={gamemode}
      gameContent={gameContent}
      selectArray={selectArray}
      question={descriptionString}
      portrait={character.portrait}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function descriptionLoader() {
  const { data, selectArray } = await getRandomCharacter();
  return { data, selectArray };
}

export default DescriptionGuess;
