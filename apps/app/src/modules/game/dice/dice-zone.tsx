import { useState } from 'react';
import './dice-zone.scss';
import { Dice, DragDropDices } from './components';
import {
  DiceModel,
  DiceZoneEnum,
  canRollDiceThisRound,
} from '@yams-tactics/domain';
import { cls, useGameContext } from '@yams-tactics/frontend-common';
import { Button } from '@yams-tactics/frontend-components';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { useTranslation } from 'react-i18next';

export function DiceZone() {
  const {
    isLoading,
    game,
    currentPlayer,
    onRollDices: dispatchRollDices,
  } = useGameContext();
  const { t } = useTranslation();

  const round = game?.currentRound ?? 'dice.1';
  const [animation, setAnimation] = useState(false);

  const [lockedDices, setLockedDices] = useState<string[]>([]);
  const [dicesOrder, setDicesOrder] = useState<string[]>(
    currentPlayer?.dices.map((dice) => dice.id) ?? []
  );

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onDiceClick = (dice: DiceModel) => {
    setLockedDices((lockedDices) =>
      lockedDices.includes(dice.id)
        ? lockedDices.filter((d) => d !== dice.id)
        : [...lockedDices, dice.id]
    );
    setDicesOrder((dicesOrder) =>
      dicesOrder.includes(dice.id)
        ? dicesOrder.filter((d) => d !== dice.id)
        : [...dicesOrder, dice.id]
    );
  };

  const canRoleDice =
    currentPlayer && canRollDiceThisRound(currentPlayer, round);

  if (isLoading) {
    return null;
  }

  const onRollClick = async () => {
    const diceToBeRolled = (currentPlayer?.dices ?? []).reduce<DiceModel[]>(
      (acc, dice) => {
        return lockedDices.includes(dice.id) ? acc : [...acc, dice];
      },
      []
    );
    // @TODO - Add a context for those dice animation to be able to display loading state on precompute

    setAnimation(true);
    await dispatchRollDices({ dices: diceToBeRolled, round });
    setAnimation(false);
  };

  return (
    <div className="w-full h-full">
      <Button
        color="blue"
        disabled={!canRoleDice || animation}
        onClick={onRollClick}
      >
        Launch dice
      </Button>

      <DragDropDices
        setDicesOrder={setDicesOrder}
        dicesOrder={[...dicesOrder]}
        setLockedDices={setLockedDices}
        lockedDices={[...lockedDices]}
        setIsDragging={setIsDragging}
      >
        <div className={cls('h-full', 'flex', 'flex-col', 'justify-around')}>
          <div className={cls('flex')}>
            <Droppable
              droppableId={DiceZoneEnum.playing}
              direction="horizontal"
            >
              {(droppableProvided) => {
                return (
                  <div
                    ref={droppableProvided.innerRef}
                    className={cls('flex', 'w-full', 'h-[250px]')}
                    {...droppableProvided.droppableProps}
                  >
                    {(
                      currentPlayer?.dices?.filter(
                        (dice) => !lockedDices.includes(dice.id)
                      ) ?? []
                    )
                      .sort(
                        (a, b) =>
                          dicesOrder.indexOf(a.id) - dicesOrder.indexOf(b.id)
                      )
                      .map((dice) => (
                        <Draggable
                          draggableId={String(dice.id)}
                          key={String(dice.id)}
                          index={dicesOrder.indexOf(dice.id)}
                        >
                          {(provided) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={cls('flex', 'm-4')}
                              >
                                <Dice
                                  dice={dice}
                                  toRotate={animation}
                                  onClick={() => onDiceClick(dice)}
                                />
                              </div>
                            );
                          }}
                        </Draggable>
                      ))}
                    {droppableProvided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>

          <Droppable
            droppableId={DiceZoneEnum.keeping}
            direction="horizontal"
            ignoreContainerClipping={false}
          >
            {(droppableProvided, snapshot) => {
              return (
                <div
                  className={cls(
                    'flex',
                    'flex-col',
                    'border-8',
                    'border-[#6F473A]',
                    'bg-[#50514F]',
                    'rounded',
                    'h-[200px]',
                    isDragging ? 'draggable-shadow' : '',
                    snapshot.isDraggingOver
                      ? 'draggable-shadow__yellow'
                      : 'draggable-shadow__blue'
                  )}
                >
                  <span className="font-M ml-2">{t(`kept_dice`)}</span>
                  <div
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    className={cls('flex', 'flex-1')}
                  >
                    {(
                      currentPlayer?.dices?.filter((dice) =>
                        lockedDices.includes(dice.id)
                      ) ?? []
                    )
                      .sort(
                        (a, b) =>
                          lockedDices.indexOf(a.id) - lockedDices.indexOf(b.id)
                      )
                      .map((dice) => (
                        <Draggable
                          draggableId={String(dice.id)}
                          key={String(dice.id)}
                          index={lockedDices.indexOf(dice.id)}
                        >
                          {(provided) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={cls('flex', 'm-4')}
                              >
                                <Dice
                                  dice={dice}
                                  toRotate={false}
                                  onClick={() => onDiceClick(dice)}
                                />
                              </div>
                            );
                          }}
                        </Draggable>
                      ))}
                    <span className="hidden">
                      {droppableProvided.placeholder}
                    </span>
                  </div>
                </div>
              );
            }}
          </Droppable>
        </div>
      </DragDropDices>
    </div>
  );
}
