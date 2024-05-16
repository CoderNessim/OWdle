import { Button, Card, Text } from '@mantine/core';
import styles from './UserInfo.module.css';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../services/apiAuth';
import ChangeUserData from './ChangeUserData';

function UserInfo() {
  const { data: user, isPending: isUserPending } = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
  });

  console.log(user);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" style={{ marginBottom: 10 }}>
        User Info
      </Text>
      {isUserPending ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>Username: {user.user_metadata.first_name}</Text>
          <Text>Email: {user.email}</Text>
        </>
      )}
      <ChangeUserData />
    </Card>
  );
}

export default UserInfo;
