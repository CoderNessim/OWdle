import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function ProfileCard() {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ width: '50%', height: '500px' }}
    >
      <Card.Section>
        <Image height={160} alt="Profile Picture" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Norway Fjord Adventures</Text>
        <Badge color="green">Online</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Update Profile Picture
      </Button>
    </Card>
  );
}

export default ProfileCard;
