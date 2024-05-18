import { Button, Group, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

function ModalChangeUserData({
  id,
  type,
  mutate,
  buttonColor,
  handleSubmitData,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [newData, setNewData] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    close(); // Close modal on form submission
    handleSubmitData(newData);
    setNewData('');
  }

  return (
    <>
      <Button
        variant="outline"
        color={buttonColor}
        style={{ margin: '10px 0' }}
        onClick={open} // Triggers the modal to open
      >
        {`Change ${type}`}
      </Button>

      <Modal opened={opened} onClose={close} title={`Change ${type}`} centered>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextInput
            label={`New ${type}`}
            placeholder={`Enter your new ${type}`}
            required
            autoFocus
            value={newData}
            onChange={(event) => setNewData(event.currentTarget.value)}
          />

          <Group position="right" mt="md">
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">{`Change ${type}`}</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

export default ModalChangeUserData;
