import { Modal } from '@mantine/core';

function ModalWin({ showModal, closeModal }) {
  return (
    <Modal
      title="Results"
      opened={showModal}
      onClose={() => closeModal()}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      Modal without header, press escape or click on overlay to close
    </Modal>
  );
}

export default ModalWin;
