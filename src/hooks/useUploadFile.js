import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProfilePicture } from '../services/apiProfilePictures';
import { notifications } from '@mantine/notifications';

export function useUploadFile() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ name, avatarFile, id }) =>
      createProfilePicture({ name, avatarFile, id }),
    onSuccess: () => {
      notifications.show({
        title: 'File uploaded!',
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      notifications.show({
        title: 'There was an error while uploading file',
        message: error.message,
        color: 'red',
      });
      console.log(error);
    },
  });
  return { mutate, isPending, isError };
}
