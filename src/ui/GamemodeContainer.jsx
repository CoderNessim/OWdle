import Gamemode from '../features/games/Gamemode';

function GamemodeContainer() {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
    >
      <Gamemode />
      <Gamemode />
    </div>
  );
}

export default GamemodeContainer;
