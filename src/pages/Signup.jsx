import { Text, Paper } from '@mantine/core';
import SignupForm from '../features/authentication/SignupForm';

export default function Signup() {
  return (
    <Paper radius="md" p="xl" >
      <Text size="lg" fw={500} style={{ paddingBottom: '20px' }}>
        Welcome to Overwatchdle! Register to create an account
      </Text>
      <SignupForm />
    </Paper>
  );
}
