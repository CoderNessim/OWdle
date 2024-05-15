import styles from './GameContent.module.css';

function GameContent({ children, gamemodeName }) {
  return (
    <>
      <h1 className={styles.title}>Guess the {gamemodeName}</h1>
      <div className={styles.description}>{children}</div>
    </>
  );
}

export default GameContent;
