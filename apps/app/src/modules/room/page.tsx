import { Link } from '@swan-io/chicane';
import { PlayerModel } from '@yams-tactics/domain';
import { Router } from '@yams-tactics/frontend-common';

export function RoomPage({ roomId }: { roomId: string }) {
  const players: PlayerModel[] = [];
  // @TODO
  const joined = true;
  const joinRoom = () => {
    console.log('todo');
  };

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
            <li key={player.id}></li>
          ))}
        </ul>
      </div>
      <button disabled={joined} onClick={joinRoom}>
        join
      </button>
    </div>
  );
}
