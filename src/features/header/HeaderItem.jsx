import { useNavigate } from 'react-router-dom';
import styles from './HeaderItem.module.css';

function HeaderItem({ link, active, setActive }) {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  return (
    <a
      key={link.label}
      className={styles.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        navigate(link.link);
        link.logoutMutate && link.logoutMutate();
        // if (link.link === 'profile')
        //   queryClient.invalidateQueries({ queryKey: ['rank'] });
      }}
    >
      {link.label}
    </a>
  );
}

export default HeaderItem;
