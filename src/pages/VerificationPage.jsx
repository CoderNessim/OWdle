import { Title, Text, Button, Container, Group } from '@mantine/core';
import { useVerification } from '../hooks/useVerification';
import { useNavigate } from 'react-router-dom';
import classes from '../ui/Error.module.css';

export default function VerificationPage() {
  const navigate = useNavigate();
  const { user, isPending, mutate } = useVerification();

  function handleVerification() {
    navigate('/login', { replace: true });
    mutate({ ...user, verified: true });
  }

  return (
    <Container className={classes.root}>
      <div className={classes.label}>Success!</div>
      <Title className={classes.title}>
        Your account has been successfully verified!
      </Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        You may start using your account by logging in
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" onClick={handleVerification}>
          {isPending ? 'Loading...' : 'Take me back to login page'}
        </Button>
      </Group>
    </Container>
  );
}
