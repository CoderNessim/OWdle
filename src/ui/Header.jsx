import { Container, Group, Loader } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderLinks } from '../hooks/useHeaderLinks';
import classes from './Header.module.css';
import HeaderItem from '../features/header/HeaderItem';
import imagePath from '../assets/overwatchdleFINALsssssssss-ezgif.com-webp-to-jpg-converter(1).png';

export default function Header() {
  const { links, isUserPending } = useHeaderLinks();
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <img
          className={classes.logo}
          src={imagePath}
          alt="Overwatch logo"
          onClick={() => {
            setActive(null);
            navigate('/app');
          }}
        />
        {isUserPending ? (
          <Loader />
        ) : (
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
        )}
      </Container>
    </header>
  );
}
