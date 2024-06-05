import { Link } from '@swan-io/chicane';
import { Router, useCreateRoom, useRooms } from '@yams-tactics/frontend-common';
import { Button } from '@yams-tactics/frontend-components';

export function RoomListPage() {
  const { data: rooms, isLoading, refetch } = useRooms();
  const { mutateAsync: createRoom } = useCreateRoom();

  return (
    <div>
      <h1>Rooms:</h1>
      <Button
        onClick={async () => {
          const room = await createRoom();
          refetch();
          Router.push('RoomPage', { roomId: room.id });
        }}
      >
        Create room
      </Button>
      <div>
        {isLoading && <p>Loading</p>}
        {!isLoading && (
          <ul>
            {rooms &&
              Object.values(rooms).map((room) => (
                <li key={room.id}>
                  <Link to={Router.RoomPage({ roomId: room.id })}>
                    {room.id}
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
