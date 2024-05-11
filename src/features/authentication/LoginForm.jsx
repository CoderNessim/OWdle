import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Anchor,
  Stack,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';

function LoginForm() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  const { mutate, isPending } = useLogin();

  function handleSubmit(data) {
    mutate(data);
    form.reset();
  }

  return (
    <form
      onSubmit={form.onSubmit((data) => {
        handleSubmit(data);
      })}
    >
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
          <Button
            radius="xl"
            onClick={() => navigate('/')}
            disabled={isPending}
          >
            Back
          </Button>
          <Button type="submit" radius="xl" disabled={isPending}>
            Login
          </Button>
        </Group>
      </Group>
    </form>
  );
}

export default LoginForm;
