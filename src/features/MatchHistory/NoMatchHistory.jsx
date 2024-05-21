import { useNavigate } from 'react-router-dom';
import classes from '../../ui/Error.module.css';
import { Button, Container, Group, Text, Title } from '@mantine/core';

function NoMatchHistory() {
  const navigate = useNavigate();
  return (
    <Container className={classes.root} style={{padding: '5px'}}>
      <Title className={classes.title} style={{marginBottom: '10px'}}>You have no games played yet!</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
       Start playing to be able to see your match history
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" onClick={() => navigate('/app')}>
          Start Playing
        </Button>
      </Group>
    </Container>
  );
}

export default NoMatchHistory;
