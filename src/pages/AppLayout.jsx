import { useNavigation, useOutlet } from 'react-router-dom';
import Header from '../ui/Header';
import GamemodeContainer from '../ui/GamemodeContainer';
import { Hourglass } from 'react-loader-spinner';
import styles from './AppLayout.module.css';

function AppLayout() {
  const outlet = useOutlet();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <>
      {isLoading && (
        <div className={styles.loaderContainer}>
          <Hourglass />
        </div>
      )}{' '}
      <Header />
      {outlet || <GamemodeContainer />}
    </>
  );
}

export default AppLayout;
