import { useEffect } from 'react';
import { useLocation, pushUnsafe, replaceUnsafe } from '@swan-io/chicane';

export type RedirectProps = {
  to: string;
  replace?: boolean;
};

/**
 *
 * @param props.to Link of the route to redirect to, build from `Routes`
 * @param props.replace Optionally replace the current location instead of pushing a new one
 * @returns
 */
export const Redirect = ({ to, replace }: RedirectProps): null => {
  const location = useLocation();

  useEffect(() => {
    // Avoid redirect loop if already on the target path
    if (location.toString() === to) {
      return;
    }

    if (replace) {
      replaceUnsafe(to);
    } else {
      pushUnsafe(to);
    }
  });

  return null;
};
