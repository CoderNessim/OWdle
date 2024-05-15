import { useLoaderData } from 'react-router-dom';
import { getRandomCharacter } from '../../services/apiOverwatch';

function AbilityGuess() {
  const data = useLoaderData();
  const randomAbility = data.abilities[Math.floor(Math.random() * data.abilities.length)].icon;
  return (
    <div>
      <img src={randomAbility} />
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function abilityLoader() {
  const data = await getRandomCharacter();
  return data;
}

export default AbilityGuess;
