import './dice.scss';

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
      className={`${'cube'} ${
        value && !rotating ? `rotating_${value}` : 'rotating'
      } ${selected ? 'selected' : ''} ${value ? `value_${value}` : ''} ${
        rotating ? 'rotating' : ''
      }`}
    >
      <div className={`${'box'} ${'box1'}`}>
        <img src="../../../assets/dice_1.svg" />
      </div>
      <div className={`${'box'} ${'box2'}`}>
        <img src="../../../assets/dice_2.svg" />
      </div>
      <div className={`${'box'} ${'box3'}`}>
        <img src="../../../assets/dice_3.svg" />
      </div>
      <div className={`${'box'} ${'box4'}`}>
        <img src="../../../assets/dice_4.svg" />
      </div>
      <div className={`${'box'} ${'box5'}`}>
        <img src="../../../assets/dice_5.svg" />
      </div>
      <div className={`${'box'} ${'box6'}`}>
        <img src="../../../assets/dice_6.svg" />
      </div>
    </div>
  );
}
