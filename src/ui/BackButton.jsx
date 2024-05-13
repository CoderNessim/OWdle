import { Button } from '@mantine/core';
import { IoArrowBackOutline } from 'react-icons/io5';

function BackButton({ onClick, styles }) {
  return (
    <Button onClick={onClick} className={styles}>
      <IoArrowBackOutline />
      Back
    </Button>
  );
}

export default BackButton;
