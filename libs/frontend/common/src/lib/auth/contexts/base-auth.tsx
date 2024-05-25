import { createContext, useContext } from 'react';
import { AuthToken } from '../token';
import { UserAuthToken } from '../types';
import { AuthTokenModel } from '@yams-tactics/domain';

export interface UserAuthContext {
  auth: {
    isAuthenticated: boolean | null;
    logout: boolean;
    userId?: string | null;
    notificationToken?: string;
  };
  sync: () => void;
  passwordLogin: (name: string) => Promise<string>;
  // logout: () => Promise<boolean>;
  register: (name: string) => Promise<string>;
  getToken: () => AuthToken<UserAuthToken>;
}

type BaseAuthContext = UserAuthContext;

export const AuthContext = createContext<BaseAuthContext | null>(null);

// useAuth (provided by AuthContext)
export const useAuth = <T extends BaseAuthContext = BaseAuthContext>(): T => {
  const context = useContext(AuthContext) as T | null;
  if (!context) {
    throw new Error(
      `value for AuthContext was not initialized. Make sure the AuthProvider is set up.`
    );
  }
  return context;
};
