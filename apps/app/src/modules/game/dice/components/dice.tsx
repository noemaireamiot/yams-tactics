import { cls } from '@yams-tactics/frontend-common';
import './dice.scss';
import { DiceModel } from '@yams-tactics/domain';

interface diceInterface {
  dice?: DiceModel;
  onClick?: () => void;
  selected?: boolean;
  rotating?: boolean;
}

export function Dice({ dice, onClick, selected, rotating }: diceInterface) {
  return (
    <div
      onClick={onClick}
      className={cls(
        'h-[100px]',
        'w-[100px]',
        'cube',
        dice?.currentFace?.value && !rotating
          ? `rotating_${dice.currentFace?.value}`
          : 'rotating',

        dice?.currentFace?.value ? `value_${dice.currentFace?.value}` : '',
        rotating ? 'rotating' : ''
      )}
    >
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <div className={cls('box', `box${index + 1}`, selected && 'selected')}>
          <img
            className={cls('w-full', 'h-full')}
            src={`../../../assets/dice_${index + 1}.svg`}
          />
        </div>
      ))}
    </div>
  );
}
