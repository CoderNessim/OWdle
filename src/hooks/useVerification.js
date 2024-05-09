import { useMutation, useQuery } from '@tanstack/react-query';
import { getUser, uploadUser } from '../services/apiAuth';
import { notifications } from '@mantine/notifications';

export function useVerification() {
  const { data: user, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const { mutate } = useMutation({
    mutationFn: (data) => uploadUser(data),
    onSuccess: () => {
      notifications.show({
        title: 'User has been verified!',
        message: 'User has been updated successfully',
        color: 'green',
      });
    },
    onError: (error) => {
      notifications.show({
        title: 'There was an error while verifying user',
        message: error.message,
        color: 'red',
      });
    },
  });
  return { mutate, isPending, user };
}
