import { Tag } from '../tag';
import './game-meta-data.scss';
import { PlayerModel } from '@yams-tactics/domain';
import { useGameContext } from '@yams-tactics/frontend-common';

interface GameMetaDataProps {
  className?: string;
  currentPlayer?: PlayerModel;
}

export function GameMetaData({ className, currentPlayer }: GameMetaDataProps) {
  const { game } = useGameContext();

  return (
    <div className={`${className || ''}`}>
      <div className={`border-radius ${'metadataWrapper'}`}>
        <div className={`${'name'} w-full`}>
          <Tag
            className={`flex justify-center w-full box-border`}
            label={currentPlayer?.user?.name || 'Loading'}
            size="L"
          />
        </div>
        <div className={`${'round'}`}>
          {game && <Tag label={`${game.currentRound}/13`} size="L" />}
        </div>
        <div className={`${'gold'}`}>
          <Tag label={`${currentPlayer?.gold}$`} size="L" />
        </div>
      </div>
    </div>
  );
}
