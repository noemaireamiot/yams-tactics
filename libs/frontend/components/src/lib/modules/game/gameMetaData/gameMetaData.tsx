import { Tag } from '../tag';
import styles from './gameMetaData.scss';
import { GameModel, PlayerModel } from '@yams-tactics/domain';

interface GameMetaDataProps {
  className?: string;
  game?: GameModel;
  currentPlayer?: PlayerModel;
}

export function GameMetaData({
  className,
  game,
  currentPlayer,
}: GameMetaDataProps) {
  return (
    <div className={`${className || ''}`}>
      <div className={`border-radius ${styles.metadataWrapper}`}>
        <div className={`${styles.name} w-full`}>
          <Tag
            className={`flex justify-center w-full box-border`}
            label={currentPlayer?.user.name || 'Loading'}
            size="L"
          />
        </div>
        <div className={`${styles.round}`}>
          {game && <Tag label={`${game.currentRound}/13`} size="L" />}
        </div>
        <div className={`${styles.gold}`}>
          <Tag label={`${currentPlayer?.gold}$`} size="L" />
        </div>
      </div>
    </div>
  );
}
