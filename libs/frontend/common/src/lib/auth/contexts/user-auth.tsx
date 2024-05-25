import {
  useState,
  useCallback,
  useEffect,
  PropsWithChildren,
  useRef,
} from 'react';
import { UserAuthService } from '../service/user-auth';
import { AuthToken } from '../token';
import { Auth, UserAuthToken } from '../types';
import { AuthContext, UserAuthContext } from './base-auth';

export function createUserAuthProvider({
  authService,
}: {
  authService: UserAuthService;
}): React.FC<PropsWithChildren> {
  const useAuthProvider = function useAuthProvider() {
    const [auth, setAuth] = useState<Auth>({
      isAuthenticated: null,
      logout: false,
      userId: null,
    });

    // Register
    const register: UserAuthContext['register'] = useCallback(
      async (name: string) => {
        const user = await authService.register(name);
        return await passwordLogin(user.name);
      },
      []
    );

    // Login
    const passwordLogin = useCallback(async (name: string) => {
      const { userId } = await authService.passwordLogin(name);
      setAuth({
        isAuthenticated: true,
        userId,
        logout: false,
      });
      return userId;
    }, []);
    // Token
    const getToken = useCallback(
      () => authService.getToken() as AuthToken<UserAuthToken>,
      []
    );

    // Sync the User and refresh its token at app Startup
    const sync = useCallback(async () => {
      if (!authService.checkAuth() && !auth.logout) {
        try {
          const { userId } =
            (await authService.silentRefresh()) as UserAuthToken;
          setAuth({
            isAuthenticated: true,
            userId,
            logout: false,
          });
          console.info(`🔓 Logged in as user ${userId}`);
        } catch (e) {
          // If errors, clear User and refresh without setting logout flag
          // await authService.logout();
          setAuth({
            isAuthenticated: false,
            userId: null,
            logout: false,
          });
        }
      }
    }, [auth]);

    // This ref deduplicate the useEffect call made twice by React in dev/StrictMode
    const isSyncingRef = useRef(false);
    useEffect(() => {
      if (auth.isAuthenticated === null && !isSyncingRef.current) {
        isSyncingRef.current = true;
        console.info('🔄 User auth Sync');
        // eslint-disable-next-line promise/prefer-await-to-then
        sync().finally(() => {
          isSyncingRef.current = false;
        });
      }
    }, [auth.isAuthenticated, sync]);

    return {
      auth,
      sync,
      passwordLogin,
      register,
      getToken,
    };
  };

  return function AuthProvider({ children }: PropsWithChildren<unknown>) {
    const auth = useAuthProvider();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
  };
}
