import { cls } from '@yams-tactics/frontend-common';
import { PropsWithChildren } from 'react';

type ShopContainerProps = PropsWithChildren<{
  title: string;
  type: 'face' | 'token' | 'passive';
  className?: string;
}>;
export function ShopContainer({
  title,
  type,
  children,
  className,
}: ShopContainerProps) {
  const colors = {
    face: { container: '#006BC3BB', title: '#0094DBBB' },
    token: { container: '#B24636BB', title: '#A53D5ABB' },
    passive: { container: '#F4E482BB', title: '#B7AC75BB' },
    roll: { container: '#F4E482BB', title: '#B7AC75BB' },
  };
  return (
    <div
      style={{ '--color': colors[type].container } as React.CSSProperties}
      className={cls(
        `bg-[var(--color)]`,
        'pr-4',
        'rounded-xl',
        'flex',
        'cursor-pointer',
        className
      )}
    >
      <div
        style={{ '--color': colors[type].title } as React.CSSProperties}
        className={cls(
          `bg-[var(--color)]`,
          'rounded-xl',
          'w-[300px]',
          'flex',
          'justify-center',
          'items-center'
        )}
      >
        <div
          className={cls(
            'text-[#2E2E2E]',
            'uppercase',
            // nice
            'text-[60px]'
          )}
        >
          {title}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
