import { Title, Text, Button, Container, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from '../ui/Error.module.css';
import { useQueryClient } from '@tanstack/react-query';

export default function ChangeEmailPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  function handleEmailChange() {
    navigate('/login', { replace: true });
    queryClient.invalidateQueries({ queryKey: ['user'] });
  }

  return (
    <Container className={classes.root}>
      <div className={classes.label}>Success!</div>
      <Title className={classes.title}>
        Your email has been successfully updated!
      </Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        You may start using your account by logging in with your new email
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" onClick={handleEmailChange}>
          {'Take me back to login page'}
        </Button>
      </Group>
    </Container>
  );
}
