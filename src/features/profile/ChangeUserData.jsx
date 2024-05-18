import { Button, Modal } from '@mantine/core';
import { useUpdateUsername } from '../../hooks/useUpdateUsername';
import ModalChangeUserData from './ModalChangeUserData';
import { useUpdatePassword } from '../../hooks/useUpdatePassword';
import { useUpdateEmail } from '../../hooks/useUpdateEmail';

function ChangeUserData({ user, isUserPending }) {
  const { mutate: mutateUsername } = useUpdateUsername();
  const { mutate: mutatePassword } = useUpdatePassword();
  const { mutate: mutateEmail } = useUpdateEmail();

  function handleUsernameSubmit(newUsername) {
    mutateUsername({ newUsername, id: user.id });
  }

  function handlePasswordSubmit(newPassword) {
    mutatePassword({ newPassword });
  }

  function handleSubmitEmail(newEmail) {
    mutateEmail({ newEmail, id: user.id });
  }

  return (
    <>
      <ModalChangeUserData
        id={user.id}
        type="Password"
        mutate={mutatePassword}
        buttonColor="blue"
        handleSubmitData={handlePasswordSubmit}
      />
      <ModalChangeUserData
        id={user.id}
        type="Email"
        mutate={mutateEmail}
        buttonColor="green"
        handleSubmitData={handleSubmitEmail}
      />
      <ModalChangeUserData
        id={user.id}
        type="Username"
        mutate={mutateUsername}
        buttonColor="orange"
        handleSubmitData={handleUsernameSubmit}
      />
    </>
  );
}

export default ChangeUserData;
