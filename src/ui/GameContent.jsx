import styles from './GameContent.module.css';

function GameContent({ children, gamemodeName, bgColor }) {
  return (
    <>
      <h1 className={styles.title}>Guess the {gamemodeName}</h1>
      <div className={styles.description} style={{backgroundColor: bgColor}}>{children}</div>
    </>
  );
}

export default GameContent;
