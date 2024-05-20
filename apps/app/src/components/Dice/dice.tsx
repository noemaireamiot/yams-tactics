import styles from './dice.scss';

interface diceInterface {
  value?: number;
  onClick?: () => void;
  rotating?: boolean;
}

export function Dice({ value, onClick, rotating = false }: diceInterface) {
  return (
    <div
      onClick={onClick}
      className={`${styles.cube} ${rotating ? styles.rotating : ''} ${
        value ? styles[`value_${value}`] : ''
      }`}
    >
      <div className={`${styles.box} ${styles.box1}`}>
        <img src="../../../assets/dice_1.jpg" />
      </div>
      <div className={`${styles.box} ${styles.box2}`}>
        <img src="../../../assets/dice_2.jpg" />
      </div>
      <div className={`${styles.box} ${styles.box3}`}>
        <img src="../../../assets/dice_3.jpg" />
      </div>
      <div className={`${styles.box} ${styles.box4}`}>
        <img src="../../../assets/dice_4.jpg" />
      </div>
      <div className={`${styles.box} ${styles.box5}`}>
        <img src="../../../assets/dice_5.jpg" />
      </div>
      <div className={`${styles.box} ${styles.box6}`}>
        <img src="../../../assets/dice_6.jpg" />
      </div>
    </div>
  );
}
