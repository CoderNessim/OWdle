import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePassword } from '../services/apiAuth';
import { notifications } from '@mantine/notifications';

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ newPassword }) => updatePassword({ newPassword }),
    onSuccess: () => {
      notifications.show({
        title: 'Password updated!',
        message: 'Your password was successfully updated',
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      notifications.show({
        title: 'There was an error while changing password',
        message: error.message,
        color: 'red',
      });
    },
  });
  return { mutate, isPending };
}
