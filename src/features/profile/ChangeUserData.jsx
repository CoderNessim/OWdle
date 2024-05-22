import { useUpdateUsername } from '../../hooks/useUpdateUsername';
import ModalChangeUserData from './ModalChangeUserData';
import { useUpdatePassword } from '../../hooks/useUpdatePassword';
import { useUpdateEmail } from '../../hooks/useUpdateEmail';

function ChangeUserData({ user }) {
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
        type="Password"
        buttonColor="blue"
        handleSubmitData={handlePasswordSubmit}
      />
      <ModalChangeUserData
        type="Email"
        buttonColor="green"
        handleSubmitData={handleSubmitEmail}
      />
      <ModalChangeUserData
        type="Username"
        buttonColor="orange"
        handleSubmitData={handleUsernameSubmit}
      />
    </>
  );
}

export default ChangeUserData;
