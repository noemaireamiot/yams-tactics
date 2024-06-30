import { cls } from '@yams-tactics/frontend-common';
import './dice.scss';
import { DiceModel } from '@yams-tactics/domain';
import { useEffect, useState } from 'react';

interface diceInterface {
  dice?: DiceModel;
  onClick?: () => void;
  toRotate?: boolean;
}

export function Dice({ dice, onClick, toRotate }: diceInterface) {
  const [isRotate, setIsRotate] = useState(toRotate);

  useEffect(() => {
    // To refresh rotation when the roll is the same value as the previous one
    if (toRotate) {
      setIsRotate(true);
      setTimeout(() => {
        setIsRotate(false);
      }, 1000);
    }
  }, [toRotate]);

  return (
    <div
      onClick={onClick}
      className={cls(
        'h-[100px]',
        'w-[100px]',
        'cube',
        dice?.currentFace?.value && isRotate
          ? `rotating_${dice.currentFace?.value}`
          : '',
        dice?.currentFace?.value ? `value_${dice.currentFace?.value}` : ''
      )}
    >
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <div key={index} className={cls('box', `box${index + 1}`)}>
          <img
            className={cls('w-full', 'h-full')}
            src={`../../../assets/dice_${index + 1}.svg`}
          />
        </div>
      ))}
    </div>
  );
}
