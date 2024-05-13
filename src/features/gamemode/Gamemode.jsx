import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import styles from './Gamemode.module.css';

function Gamemode({
  route,
  badgeColor,
  badgeText,
  imageUrl,
  title,
  description,
}) {
  const navigate = useNavigate();
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.wrapper}
    >
      <Card.Section component="a">
        <Image
          alt="hero image"
          src={imageUrl}
          height={200}
          fallbackSrc="https://placehold.co/600x400?text=HeroImage"
          onClick={() => navigate(`${route}`)}
          style={{ cursor: 'pointer' }}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Badge color={badgeColor}>{badgeText}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Button
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => navigate(`${route}`)}
      >
        Play
      </Button>
    </Card>
  );
}

export default Gamemode;
