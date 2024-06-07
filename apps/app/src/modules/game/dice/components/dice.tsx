import styles from './dice.scss';

interface diceInterface {
  value?: number;
  onClick?: () => void;
  selected?: boolean;
  rotating?: boolean;
}

export function Dice({ value, onClick, selected, rotating }: diceInterface) {
  return (
    <div
      onClick={onClick}
      className={`${styles.cube} ${
        value && !rotating ? styles[`rotating_${value}`] : styles.rotating
      } ${selected ? styles.selected : ''} ${
        value ? styles[`value_${value}`] : ''
      } ${rotating ? styles.rotating : ''}`}
    >
      <div className={`${styles.box} ${styles.box1}`}>
        <img src="../../../assets/dice_1.svg" />
      </div>
      <div className={`${styles.box} ${styles.box2}`}>
        <img src="../../../assets/dice_2.svg" />
      </div>
      <div className={`${styles.box} ${styles.box3}`}>
        <img src="../../../assets/dice_3.svg" />
      </div>
      <div className={`${styles.box} ${styles.box4}`}>
        <img src="../../../assets/dice_4.svg" />
      </div>
      <div className={`${styles.box} ${styles.box5}`}>
        <img src="../../../assets/dice_5.svg" />
      </div>
      <div className={`${styles.box} ${styles.box6}`}>
        <img src="../../../assets/dice_6.svg" />
      </div>
    </div>
  );
}
