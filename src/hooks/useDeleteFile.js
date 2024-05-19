import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProfilePicture } from '../services/apiProfilePictures';
import { notifications } from '@mantine/notifications';

export function useDeleteFile() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, avatarFile }) =>
      deleteProfilePicture({ id, avatarFile }),
    onSuccess: () => {
      notifications.show({
        title: 'Profile Picture Deleted!',
        message: 'Your profile picture will now be the default avatar',
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      notifications.show({
        title: 'There was an error while deleting profile picture',
        message: error.message,
        color: 'red',
      });
    },
  });
  return { mutate, isPending };
}
