import { NavLink } from 'react-router-dom';
import styles from './HeaderItem.module.css';
import { useQueryClient } from '@tanstack/react-query';

function HeaderItem({ link }) {
  const queryClient = useQueryClient();

  const handleNavLinkClick = () => {
    if (link.logoutMutate) {
      link.logoutMutate();
    }
    if (link.link === 'profile') {
      queryClient.invalidateQueries({ queryKey: ['rank'] });
    }

    if (link.link === 'history') {
      queryClient.invalidateQueries({ queryKey: ['game_history'] });
    }
  };

  return (
    <NavLink
      to={link.link}
      className={({ isActive }) =>
        isActive ? `${styles.link} ${styles.active}` : styles.link
      }
      onClick={handleNavLinkClick}
    >
      {link.label}
    </NavLink>
  );
}

export default HeaderItem;
