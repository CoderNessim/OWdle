import { useLoaderData } from 'react-router-dom';
import { getRandomCharacter } from '../../services/apiOverwatch';
import GameContent from '../../ui/GameContent';
import GameLayout from '../GameLayout/GameLayout';

function AbilityGuess() {
  const { data: character, selectArray } = useLoaderData();
  const correctAnswer = character.name.toLowerCase();
  const randomAbility =
    character.abilities[Math.floor(Math.random() * character.abilities.length)]
      .icon;
  const numTries = 3;
  const gamemode = 'Ability Guess';
  const gameContent = (
    <GameContent gamemodeName="Hero by their Ability" bgColor='black'>
      <img src={randomAbility} />
    </GameContent>
  );
  const imageQuestion = <img src={randomAbility} />;

  return (
    <GameLayout
      correctAnswer={correctAnswer}
      numTries={numTries}
      gamemode={gamemode}
      gameContent={gameContent}
      selectArray={selectArray}
      question={randomAbility}
      portrait={character.portrait}
      imageQuestion={imageQuestion}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function abilityLoader() {
  const { data, selectArray } = await getRandomCharacter();
  return { data, selectArray };
}

export default AbilityGuess;
