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
        title: `Welcome back, ${user.user.identities[0].identity_data.first_name}!`,
        message: 'Login was successful',
        color: 'green'
      });
      navigate('/app');
      queryClient.setQueryData(['user'], user.user);
    },
    onError: (error) => {
      console.log(error)
      notifications.show({
        title: 'There was an error while logging in',
        message: error.message,
        color: 'red',
      });
    },
  });
  return { mutate, isPending, isError };
}
