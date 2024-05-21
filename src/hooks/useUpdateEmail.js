//work in progress
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEmail } from '../services/apiAuth';
import { notifications } from '@mantine/notifications';

export function useUpdateEmail() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ newEmail, id }) => updateEmail({ newEmail, id }),
    onSuccess: () => {
      notifications.show({
        title: 'Email sent!',
        message: 'Check your email for a confirmation link to update your email',
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      notifications.show({
        title: 'There was an error while updating your email',
        message: error.message,
        color: 'red',
      });
    },
  });
  return { mutate, isPending };
}
