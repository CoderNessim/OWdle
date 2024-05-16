import { Container, Grid, Title } from '@mantine/core';
import ProfileCard from '../features/profile/ProfileCard';
import Stats from '../features/profile/Stats';
import UserInfo from '../features/profile/UserInfo';

function Profile() {
  return (
    <Container>
      <Grid>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <ProfileCard />
          <div>
            <Stats />
            <UserInfo />
          </div>
        </div>
      </Grid>
    </Container>
  );
}

export default Profile;
