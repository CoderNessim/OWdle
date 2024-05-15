import Gamemode from '../features/gamemodes/Gamemode';
import tracerImg from '../assets/tracer.jpeg';
import soldierImg from '../assets/SOldier-76.jpeg';
import sombraImg from '../assets/overwatch-2-sombra-hero-select.jpeg';
import roadhogImg from '../assets/roadhog-00.jpeg';
function GamemodeContainer() {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
    >
      <Gamemode
        route="descriptionGuess"
        badgeColor="green"
        badgeText="easy"
        title="Guess the description"
        description="Guess the hero based on their description"
        imageUrl={tracerImg}
      />
      <Gamemode
        imageUrl={soldierImg}
        route="imageGuess"
        badgeColor="red"
        badgeText="hard"
        title="Guess the image"
        description="Guess the hero based on a cropped section of their image"
      />
      <Gamemode
        imageUrl={sombraImg}
        route="heroGuess"
        badgeColor="yellow"
        badgeText="medium"
        title="Guess the hero"
        description="Guess the hero, every guess provides hints based on the hero's abilities"
      />
      <Gamemode
        imageUrl={roadhogImg}
        route="abilityGuess"
        badgeColor="green"
        badgeText="easy"
        title="Guess the ability"
        description="Guess the hero based on a given image of one of their abilities, this may include their weapons"
      />
    </div>
  );
}

export default GamemodeContainer;
