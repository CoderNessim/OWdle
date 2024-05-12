import { useQuery } from '@tanstack/react-query';
import { getUser } from '../services/apiAuth';
import { useLogout } from './useLogout';

export function useHeaderLinks() {
  const { data: user, isPending: isUserPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  let links = [];
  const { logoutMutate } = useLogout();
  if (user) {
    links = [
      
      {
        link: 'profile',
        label: 'Profile',
      },
      {
        link: 'leaderboard',
        label: 'Leaderboard',
      },
      {
        link: 'history',
        label: 'Match History',
      },
      {
        link: '/',
        label: 'Logout',
        logoutMutate,
      },
    ];
  } else {
    links = [
      {
        link: '/login',
        label: 'Login',
      },
      {
        link: '/signup',
        label: 'Register',
      },
      {
        link: 'leaderboard',
        label: 'Leaderboard',
      },
    ];
  }

  return { links, isUserPending };
}
