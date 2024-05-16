import { Button } from '@mantine/core';

function ChangeUserData() {
  return (
    <>
      <Button variant="outline" color="blue" style={{ margin: '10px 0' }}>
        Change Password
      </Button>
      <Button variant="outline" color="green" style={{ margin: '10px 0' }}>
        Change Email
      </Button>
      <Button variant="outline" color="red" style={{ margin: '10px 0' }}>
        Delete Account
      </Button>
    </>
  );
}

export default ChangeUserData;
