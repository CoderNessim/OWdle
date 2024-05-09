import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../services/apiAuth';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logoutMutate, isPending } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      notifications.show({
        title: 'Logout successful!',
        message: 'You will now be redirected to the home page',
        color: 'green',
      });
      queryClient.removeQueries({ queryKey: ['user'], exact: true });
      navigate('/', { replace: true });
    },
    onError: (error) => {
      notifications.show({
        title: 'There was an error while loging out',
        message: error.message,
        color: 'red',
      });
      console.log(error.message);
    },
  });
  return { logoutMutate, isPending };
}
