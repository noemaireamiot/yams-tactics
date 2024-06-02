import { Link } from '@swan-io/chicane';
import { PLAYER_PER_ROOM, UserModel } from '@yams-tactics/domain';
import {
  Router,
  useAuth,
  useJoinRoom,
  useRoom,
} from '@yams-tactics/frontend-common';
import { v4 } from 'uuid';

export function RoomPage({ roomId }: { roomId: string }) {
  const { auth } = useAuth();
  const { data, isLoading, refetch } = useRoom(roomId);
  const { mutateAsync: joinRoom } = useJoinRoom();

  const joined =
    isLoading || !!data?.users.find((user) => user.id === auth.userId);

  const users = data?.users ?? [];
  const players = isLoading
    ? []
    : [
        ...users,
        ...new Array(PLAYER_PER_ROOM - users.length)
          .fill(0)
          .map((_, i): UserModel => {
            const index = users.length + i + 1;
            const id = v4();
            return {
              id,
              name: `Bot ${index}`,
              avatar: null,
            };
          }),
      ];

  return (
    <div>
      <Link to={Router.RoomList()}>{'<'} RoomList</Link>
      <div className="h-4"></div>
      <h1>Room:</h1>
      <div>id: {roomId}</div>
      <div>
        Players:
        <ul>
          {players.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      </div>
      <button
        disabled={joined}
        onClick={async () => {
          await joinRoom({ id: roomId });
          refetch();
        }}
      >
        join
      </button>
    </div>
  );
}
