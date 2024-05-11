import { useOutlet } from 'react-router-dom';
import Header from '../ui/Header';
import GamemodeContainer from '../ui/GamemodeContainer';

function AppLayout() {
  const outlet = useOutlet();
  return (
    <>
      <Header />
      {outlet || <GamemodeContainer />}

    </>
  );
}

export default AppLayout;
