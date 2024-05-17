import { Button} from '@mantine/core';
import { useUpdateUsername } from '../../hooks/useUpdateUsername';
import ModalChangeUserData from './ModalChangeUserData';

function ChangeUserData({ user, isUserPending }) {
  const { mutate: mutateUsername } = useUpdateUsername();

  return (
    <>
      <Button variant="outline" color="blue" style={{ margin: '10px 0' }}>
        Change Password
      </Button>
      <Button variant="outline" color="green" style={{ margin: '10px 0' }}>
        Change Email
      </Button>
      <ModalChangeUserData id={user.id} type="Username" mutate={mutateUsername} />
    </>
  );
}

export default ChangeUserData;
