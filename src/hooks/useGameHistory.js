import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser } from '../services/apiAuth';
import { getGameHistory, uploadGame } from '../services/apiGameHistory';
import { notifications } from '@mantine/notifications';

export function useGameHistory() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const { data: gameHistory, isPending } = useQuery({
    queryKey: ['game_history'],
    queryFn: () => getGameHistory(user?.id),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ isWin, id, currentGameHistory, attempts, correctAnswer, gamemode }) =>
      uploadGame({ isWin, id, currentGameHistory, attempts, correctAnswer, gamemode }),
    onSuccess: (history) => {
      queryClient.setQueryData(['game_history'], history);
    },
    onError: (error) => {
      notifications.show({
        title: 'There was an error while uploading game history',
        message: error.message,
        color: 'red',
      });
    },
  });

  return { mutate, gameHistory, user, isPending };
}
