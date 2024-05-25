import { useLocation } from '@swan-io/chicane';
import { Router, useAuth } from '@yams-tactics/frontend-common';
import { useEffect } from 'react';

type IsAuthenticatedGuardProps = {
  children: JSX.Element;
  redirectRoute: 'Login' | 'Register';
};

export const IsAuthenticatedConsoleGuard = ({
  children,
  redirectRoute,
}: IsAuthenticatedGuardProps) => {
  const { auth } = useAuth();
  const { toString } = useLocation();

  // Set redirect if not authenticated (except for logout)
  useEffect(() => {
    if (auth.isAuthenticated === false) {
      let options = {};
      if (!auth.logout) {
        options = { redirect: toString() };
      }
      Router.push(redirectRoute);
    }
  }, [auth, redirectRoute, toString]);

  // Not authenticated -> redirect
  if (auth.isAuthenticated === false) {
    return <h1>Loading</h1>;
  }

  return children;
};
