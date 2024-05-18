import { Button, FileInput, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUploadFile } from '../../hooks/useUploadFile';
import { useDeleteFile } from '../../hooks/useDeleteFile';

function ModalUploadFile({ profilePicture, image, setImage, name, id }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: uploadFile, isPending: isUploadPending } = useUploadFile();
  const { mutate: deleteFile, isPending: isDeletionPending } = useDeleteFile();
  //{ folder, id }
  function handleFileChange(file) {
    setImage(file);
  }

  function handleSubmit() {
    uploadFile({ name, avatarFile: image, id });
    setImage('');
  }

  function handleDelete() {
    deleteFile({ name, id, avatarFile: profilePicture });
  }

  return (
    <>
      {profilePicture ? (
        <Button
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={handleDelete}
          disabled={isDeletionPending}
        >
          Delete Profile Picture
        </Button>
      ) : (
        <>
          <Modal opened={opened} onClose={close} title="File Upload" centered>
            <FileInput
              label="Select a file"
              description="File should be either .png or .jpg format"
              placeholder="Click me"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
            />
            <Group position="right" mt="md">
              <Button variant="default" onClick={close}>
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isUploadPending}
              >
                Upload
              </Button>
            </Group>{' '}
          </Modal>
          <Button color="blue" fullWidth mt="md" radius="md" onClick={open}>
            Upload Profile Picture
          </Button>
        </>
      )}
    </>
  );
}

export default ModalUploadFile;
