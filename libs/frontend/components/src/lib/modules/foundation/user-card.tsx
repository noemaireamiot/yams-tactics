import { UserModel } from '@yams-tactics/domain';
import styles from './user-card.scss';

export function UserCard({
  user,
  score,
}: {
  user: UserModel;
  score?: number | null;
}) {
  return (
    <div className={`${styles.userCardContainer}`}>
      <img
        className={`${styles.avatar}`}
        src={user.avatar ?? ''}
        alt={user.name}
      />
      {typeof score === 'number' && (
        <span className={`${styles.score} font-M`}>
          {/* TODO calcutate score (or store it) */}43
        </span>
      )}
      <div
        style={{
          gridColumn: 'span 2',
        }}
        className="ellipsis"
      >
        {user.name}
      </div>
    </div>
  );
}
