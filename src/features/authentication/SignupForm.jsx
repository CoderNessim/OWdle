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
import { useSignup } from '../../hooks/useSignup';

function SignupForm() {
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

  const { mutate, isPending } = useSignup();

  function handleSubmit(data) {
    console.log(data);
    mutate(data);
  }

  return (
    <form
      onSubmit={form.onSubmit((data) => {
        handleSubmit(data);
      })}
    >
      <Stack>
        <TextInput
          label="Name"
          placeholder="Your name"
          value={form.values.name}
          onChange={(event) =>
            form.setFieldValue('name', event.currentTarget.value)
          }
          radius="md"
        />

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
          onClick={() => navigate('/login')}
          size="xs"
        >
          Already have an account? Login
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
            Register
          </Button>
        </Group>
      </Group>
    </form>
  );
}

export default SignupForm;
