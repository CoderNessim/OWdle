import { useState } from 'react';
import { Container, Group } from '@mantine/core';
import classes from './Header.module.css';

export default function Header({ loggedIn }) {
  // const [active, setActive] = useState(links[0].link);

  // const items =
  //   <a
  //     key={link.label}
  //     href={link.link}
  //     className={classes.link}
  //     data-active={active === link.link || undefined}
  //     onClick={(event) => {
  //       event.preventDefault();
  //       setActive(link.link);
  //     }}
  //   >
  //     {link.label}
  //   </a>

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <img
          className={classes.logo}
          src="https://qmezgmkxttnfzmnafzvz.supabase.co/storage/v1/object/sign/logos/owlogo.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvcy9vd2xvZ28uanBlZyIsImlhdCI6MTcxNTE5NzI0MCwiZXhwIjoxNzQ2NzMzMjQwfQ.Su9hDg6zod3UTrXh1WbrVUvu5-tXWhGSbpzgonVdt5A&t=2024-05-08T19%3A40%3A40.989Z"
          alt="Overwatch logo"
        />
        <Group gap={5} visibleFrom="xs">
          {/* {items} */}
        </Group>
      </Container>
    </header>
  );
}
