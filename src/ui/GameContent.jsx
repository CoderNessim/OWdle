import styles from './GameContent.module.css';

function GameContent({ children, gamemodeName, bgColor, contentWidth }) {
  return (
    <>
      <h1 className={styles.title}>Guess the {gamemodeName}</h1>
      {gamemodeName === 'Stats' && <h3 style={{textAlign: 'center'}}>Every attempt gives you a hint</h3>}
      <div
        className={styles.description}
        style={{
          backgroundColor: bgColor,
          width: contentWidth || 'auto',
        }}
      >
        {children}
      </div>
    </>
  );
}

export default GameContent;
