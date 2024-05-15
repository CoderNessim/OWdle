import { Text, Paper } from '@mantine/core';
import LoginForm from '../features/authentication/LoginForm';

export default function Login() {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh', width: '100vw' }}>
      <Paper radius="md" p="xl">
        <Text size="lg" fw={500} style={{ paddingBottom: '20px' }}>
          Welcome back to Overwatchdle!
        </Text>
        <LoginForm />
      </Paper>
    </div>
  );
}
