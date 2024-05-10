import { useNavigate } from 'react-router-dom';
import styles from './HeaderItem.module.css';

function HeaderItem({ link, active, setActive }) {
  const navigate = useNavigate();
  return (
    <a
      key={link.label}
      className={styles.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        navigate(link.link);
      }}
    >
      {link.label}
    </a>
  );
}

export default HeaderItem;
