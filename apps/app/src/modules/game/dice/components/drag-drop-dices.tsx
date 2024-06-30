import { DiceZoneEnum } from '@yams-tactics/domain';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';

export function DragDropDices({
  setLockedDices,
  lockedDices,
  setDicesOrder,
  dicesOrder,
  setIsDragging,
  children,
}: {
  setLockedDices: (lockedDices: string[]) => void;
  lockedDices: string[];
  setDicesOrder: (dicesOrder: string[]) => void;
  dicesOrder: string[];
  setIsDragging: (isDragging: boolean) => void;
  children: JSX.Element;
}) {
  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source } = result;
    setIsDragging(false);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // TODO refactor this shit
    if (destination.droppableId === source.droppableId) {
      if (destination.droppableId === DiceZoneEnum.playing) {
        const element = dicesOrder[source.index];
        dicesOrder.splice(source.index, 1);
        dicesOrder.splice(destination.index, 0, element);
        setDicesOrder(dicesOrder);
      } else {
        const element = lockedDices[source.index];
        lockedDices.splice(source.index, 1);
        lockedDices.splice(destination.index, 0, element);
        setLockedDices(lockedDices);
      }
    } else {
      if (destination.droppableId === DiceZoneEnum.playing) {
        const element = lockedDices[source.index];
        lockedDices.splice(source.index, 1);
        setLockedDices(lockedDices);
        dicesOrder.splice(destination.index, 0, element);
        setDicesOrder(dicesOrder);
      } else {
        const element = dicesOrder[source.index];
        dicesOrder.splice(source.index, 1);
        setDicesOrder(dicesOrder);
        lockedDices.splice(destination.index, 0, element);
        setLockedDices(lockedDices);
      }
    }
  };
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={() => {
        setIsDragging(true);
      }}
    >
      {children}
    </DragDropContext>
  );
}
