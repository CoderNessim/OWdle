import { useNavigation, useOutlet } from 'react-router-dom';
import Header from '../ui/Header';
import GamemodeContainer from '../ui/GamemodeContainer';
import Loader from '../ui/Loader';

function AppLayout() {
  const outlet = useOutlet();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <>
      {isLoading && <Loader />}
      <Header />
      {outlet || <GamemodeContainer />}
    </>
  );
}

export default AppLayout;
