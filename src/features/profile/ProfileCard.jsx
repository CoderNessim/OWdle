import { Card, Image, Text, Badge, Group } from '@mantine/core';
import { useState } from 'react';
import ModalUploadFile from './ModalUploadFile';
import styles from './ProfileCard.module.css';

function ProfileCard({ user, isUserPending }) {
  const name = user.user_metadata.first_name;
  const profilePicture = user.user_metadata.profile_picture;
  const [image, setImage] = useState('');
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.card}
    >
      <Card.Section>
        <Image
          height={300}
          src={profilePicture}
          fit="contain"
          fallbackSrc="https://placehold.co/600x400?text=Profile"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        {!isUserPending ? (
          <Text fw={500}>{name}</Text>
        ) : (
          <Text>Loading...</Text>
        )}
        <Badge color="green">Online</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Play the OWdle to improve your stats and climb your way to the top of
        the leaderboard!
      </Text>

      <ModalUploadFile
        profilePicture={profilePicture}
        image={image}
        setImage={setImage}
        name={name}
        id={user.id}
      />
    </Card>
  );
}

export default ProfileCard;
