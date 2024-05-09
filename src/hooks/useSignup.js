import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ email, password }) => signup({ email, password }),
    onSuccess: () => {
      notifications.show({
        title: `Registration successful!`,
        message: 'Confirmation link was sent to this email',
        color: 'green',
      });
      // queryClient.setQueryData(['user'], user);
      navigate('/');
    },
    onError: (error) => {
      notifications.show({
        title: 'There was an error while registering',
        message: error.message,
        color: 'red',
      });
      console.log(error.message);
    },
  });

  return { mutate, isPending, isError };
}
