import { UserModel } from '@yams-tactics/domain';
import './user-card.scss';

export function UserCard({
  user,
  score,
}: {
  user: UserModel;
  score?: number | null;
}) {
  return (
    <div className="userCardContainer">
      <img className="avatar" src={user.avatar ?? ''} alt={user.name} />
      {typeof score === 'number' && (
        <span className="score font-M">{score}</span>
      )}
      <div
        style={{
          gridColumn: typeof score === 'number' ? 'span 2' : undefined,
        }}
        className="ellipsis"
      >
        {user.name}
      </div>
    </div>
  );
}
