import { Card, Text } from '@mantine/core';
import ChangeUserData from './ChangeUserData';

function UserInfo({ user, isUserPending }) {
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
      {!isUserPending && <ChangeUserData user={user} isUserPending={isUserPending} />}
    </Card>
  );
}

export default UserInfo;
