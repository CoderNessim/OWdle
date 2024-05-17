import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUsername } from '../services/apiAuth';
import { notifications } from '@mantine/notifications';

export function useUpdateUsername() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ newUsername, id }) => updateUsername({ newUsername, id }),
    onSuccess: () => {
      notifications.show({
        title: 'Username updated!',
        message: 'Your username was successfully updated',
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      notifications.show({
        title: 'There was an error while updating username',
        message: error.message,
        color: 'red',
      });
    },
  });
  return { mutate, isPending };
}
