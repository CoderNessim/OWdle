import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ email, password, name }) => signup({ email, password, name }),
    onSuccess: () => {
      notifications.show({
        title: `Registration successful!`,
        message: 'Confirmation link was sent to this email',
        color: 'green',
      });
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
