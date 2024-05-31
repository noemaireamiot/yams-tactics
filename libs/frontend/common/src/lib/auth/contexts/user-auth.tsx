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

    const register: UserAuthContext['register'] = useCallback(
      async (name: string) => {
        const user = await authService.register(name);
        return await passwordLogin(user.name);
      },
      []
    );

    const logout = useCallback(async () => {
      await authService.logout();
      setAuth({
        isAuthenticated: false,
        userId: null,
        logout: true,
      });
      return true;
    }, []);

    const passwordLogin = useCallback(async (name: string) => {
      const { userId } = await authService.passwordLogin(name);
      setAuth({
        isAuthenticated: true,
        userId,
        logout: false,
      });
      return userId;
    }, []);

    const getToken = useCallback(
      () => authService.getToken() as AuthToken<UserAuthToken>,
      []
    );

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
          await authService.logout();
          setAuth({
            isAuthenticated: false,
            userId: null,
            logout: false,
          });
        }
      }
    }, [auth]);

    // deduplicate the useEffect call made twice by React in dev/StrictMode
    const isSyncingRef = useRef(false);
    useEffect(() => {
      if (auth.isAuthenticated === null && !isSyncingRef.current) {
        isSyncingRef.current = true;
        console.info('🔄 User auth Sync');
        sync().finally(() => {
          isSyncingRef.current = false;
        });
      }
    }, [auth.isAuthenticated, sync]);

    return {
      auth,
      sync,
      logout,
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
