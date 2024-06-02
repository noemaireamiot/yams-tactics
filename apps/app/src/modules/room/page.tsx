import { Link } from '@swan-io/chicane';
import { PLAYER_PER_ROOM, UserModel } from '@yams-tactics/domain';
import {
  Router,
  useAuth,
  useJoinRoom,
  useRoom,
  useStartGame,
} from '@yams-tactics/frontend-common';
import { UserCard } from '@yams-tactics/frontend-components';
import { v4 } from 'uuid';

const botAvatar =
  'https://s22908.pcdn.co/wp-content/uploads/2022/02/what-are-bots.jpg';

export function RoomPage({ roomId }: { roomId: string }) {
  const { auth } = useAuth();
  const { data, isLoading, refetch } = useRoom(roomId);
  const { mutateAsync: joinRoom } = useJoinRoom();
  const { mutateAsync: startGame } = useStartGame();

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
              avatar: botAvatar,
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
        <h3>Players:</h3>
        <div>
          {players.map((player) => (
            <UserCard key={player.id} user={player} />
          ))}
        </div>
      </div>
      <div className="flex">
        <button
          disabled={joined}
          onClick={async () => {
            await joinRoom({ id: roomId });
            refetch();
          }}
        >
          join
        </button>
        <button
          onClick={async () => {
            const { game } = await startGame({ id: roomId });
            if (game) Router.push('Game', { gameId: game.id });
          }}
        >
          start
        </button>
      </div>
    </div>
  );
}
