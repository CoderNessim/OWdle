import { Container, Grid } from '@mantine/core';
import ProfileCard from '../features/profile/ProfileCard';
import Stats from '../features/profile/Stats';
import UserInfo from '../features/profile/UserInfo';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../services/apiAuth';

function Profile() {
  const { data: user, isPending: isUserPending } = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
  });

  return (
    <Container>
      <Grid>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <ProfileCard user={user} isUserPending={isUserPending} />
          <div>
            <Stats />
            <UserInfo user={user} isUserPending={isUserPending} />
          </div>
        </div>
      </Grid>
    </Container>
  );
}

export default Profile;
