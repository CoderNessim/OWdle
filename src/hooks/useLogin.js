import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/apiAuth';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      notifications.show({
        title: `Welcome back, ${user.name}!`,
        message: 'Login was successful',
      });
      navigate('/app');
      console.log(user)
      queryClient.setQueryData(['user'], user);
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
