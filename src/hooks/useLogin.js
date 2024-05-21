import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/apiAuth';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: ({ user, gameHistory, rank }) => {
      queryClient.setQueryData(['game_history'], gameHistory);
      queryClient.setQueryData(['user'], user.user);
      queryClient.setQueryData(['rank'], rank);
      notifications.show({
        title: `Welcome back, ${user.user.user_metadata.first_name}!`,
        message: 'Login was successful',
        color: 'green',
      });
      navigate('/app');
    },
    onError: (error) => {
      notifications.show({
        title: 'There was an error while logging in',
        message: error.message,
        color: 'red',
      });
    },
  });

  return { mutate, isPending, isError };
}
