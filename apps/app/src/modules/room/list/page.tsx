import { Link } from '@swan-io/chicane';
import { Router, useCreateRoom, useRooms } from '@yams-tactics/frontend-common';
import { useEffect } from 'react';

export function RoomListPage() {
  const { data: rooms, isLoading, refetch } = useRooms();
  const { mutateAsync: createRoom } = useCreateRoom();

  useEffect(() => {
    // @TODO - Replace with sse ?
    const interval = setInterval(refetch, 5000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div>
      <h1>Rooms:</h1>
      <button
        onClick={async () => {
          const room = await createRoom();
          // @TODO - Join the room
          refetch();
          Router.push('RoomPage', { roomId: room.id });
        }}
      >
        Create room
      </button>
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
