import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" fw={500} style={{ paddingBottom: '20px' }}>
        Welcome to Overwatchdle, login to your account
      </Text>
      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@gmail.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => navigate('/signup')}
            size="xs"
          >
            {`Don't have an account? Register`}
          </Anchor>
          <Group>
            <Button radius="xl" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </Group>
      </form>
    </Paper>
  );
}
