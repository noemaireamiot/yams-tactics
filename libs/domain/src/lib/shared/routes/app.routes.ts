// Here we list all our application pages
export const appRoutes = {
  AppArea: '/*',
  AppRoot: '/',

  RegisterArea: '/register/*',
  Register: '/register',
  LoginArea: '/login/*',
  Login: '/login',

  RoomArea: '/room/*',
  RoomList: '/room',
  RoomPage: '/room/:roomId',

  GameArea: '/game/*',
  Game: '/game/:gameId',
} as const;
