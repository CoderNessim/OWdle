import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import Error from './ui/Error';
import Signup from './pages/Signup';
import VerificationPage from './pages/VerificationPage';
import ImageGuess, { imageLoader } from './features/gamemodes/ImageGuess';
import AbilityGuess, { abilityLoader } from './features/gamemodes/AbilityGuess';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import DescriptionGuess, {
  descriptionLoader,
} from './features/gamemodes/DescriptionGuess';
import Profile from './pages/Profile';
import ChangeEmailPage from './ui/ChangeEmailPage';
import LeaderBoard, {
  LeaderBoardLoader,
} from './features/leaderboard/LeaderBoard';
import MatchHistory from './features/MatchHistory/MatchHistory';
import HeroGuess, { heroGuessLoader } from './features/gamemodes/HeroGuess';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: 'signup',
      element: <Signup />,
    },
    {
      path: '/app',
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'leaderboard',
          element: <LeaderBoard />,
          loader: LeaderBoardLoader,
        },
        {
          path: 'history',
          element: <MatchHistory />,
        },
        {
          path: 'descriptionGuess',
          element: <DescriptionGuess />,
          loader: descriptionLoader,
        },
        {
          path: 'imageGuess',
          element: <ImageGuess />,
          loader: imageLoader,
        },
        {
          path: 'heroGuess',
          element: <HeroGuess />,
          loader: heroGuessLoader
        },
        {
          path: 'abilityGuess',
          element: <AbilityGuess />,
          loader: abilityLoader,
        },
      ],
    },
    {
      path: '/verified',
      element: <VerificationPage />,
    },
    {
      path: '/changeEmail',
      element: <ChangeEmailPage />,
    },
    {
      path: '*',
      element: <Error routeDoesNotExist={true} />,
    },
  ]);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </PersistQueryClientProvider>
  );
}

export default App;
