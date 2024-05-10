import { Container, Group } from '@mantine/core';
import { useState } from 'react';
import classes from './Header.module.css';
import HeaderItem from './HeaderItem';
import { useNavigate } from 'react-router-dom';
import imagePath from '../assets/overwatchdleFINAL-ezgif.com-webp-to-jpg-converter.jpg';

export default function Header() {
  const links = [
    {
      link: 'settings',
      label: 'Settings',
    },
    {
      link: 'profile',
      label: 'Profile',
    },
  ];
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <img
          className={classes.logo}
          //client/src/assets/overwatchdleFINAL-ezgif.com-webp-to-jpg-converter.jpg
          src={imagePath}
          alt="Overwatch logo"
          onClick={() => {
            setActive(null);
            navigate('/app');
          }}
        />
        <Group gap={5} visibleFrom="xs">
          {links.map((link, i) => (
            <HeaderItem
              key={i}
              link={link}
              active={active}
              setActive={setActive}
            />
          ))}
        </Group>
      </Container>
    </header>
  );
}
