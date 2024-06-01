// Here we list all our application pages
export const appRoutes = {
  AppArea: '/*',
  AppRoot: '/',

  RegisterArea: '/register/*',
  Register: '/register?:redirect',
  LoginArea: '/login/*',
  Login: '/login?:redirect',

  RoomArea: '/room/*',
  RoomList: '/room',
  RoomPage: '/room/:roomId',

  GameArea: '/game/*',
  Game: '/game/:gameId',
} as const;
