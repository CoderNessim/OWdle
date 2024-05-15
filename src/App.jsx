import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import Error from './ui/Error';
import Signup from './pages/Signup';
import VerificationPage from './pages/VerificationPage';
import GameLayout, {
  descriptionLoader,
} from './features/GameLayout/GameLayout';
import ImageGuess, { imageLoader } from './features/gamemodes/ImageGuess';
import AbilityGuess, { abilityLoader } from './features/gamemodes/AbilityGuess';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
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
          path: 'settings',
          element: <div>Settings</div>,
        },
        {
          path: 'profile',
          element: <div>Profile</div>,
        },
        {
          path: 'leaderboard',
          element: <div>Leaderboard</div>,
        },
        {
          path: 'history',
          element: <div>Match History</div>,
        },
        {
          path: 'descriptionGuess',
          element: <GameLayout />,
          loader: descriptionLoader,
        },
        {
          path: 'imageGuess',
          element: <ImageGuess />,
          loader: imageLoader,
        },
        {
          path: 'heroGuess',
          element: <div>hero guess</div>,
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
      path: '*',
      element: <Error routeDoesNotExist={true} />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
