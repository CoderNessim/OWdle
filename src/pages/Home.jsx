import { Container, Text, Button, Group } from '@mantine/core';
import classes from './Home.module.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          An{' '}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit
          >
            Overwatch inspired
          </Text>{' '}
          Worlde game
        </h1>

        <Text className={classes.description} color="dimmed">
          Dive into a blend of strategy and fun designed for Overwatch fans and
          Wordle enthusiasts alike. Each puzzle is a new opportunity to test
          your knowledge and quick thinking.
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            onClick={() => navigate('/app')}
          >
            Start Playing
          </Button>

          <Button
            component="a"
            size="xl"
            variant="default"
            className={classes.control}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Group>
      </Container>
    </div>
  );
}
