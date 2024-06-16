import { cls } from '@yams-tactics/frontend-common';
import { Roll, ShopContainer } from './components';
import { select } from 'ts-pattern/dist/patterns';

export function ShopZone() {
  return (
    <div className={cls('flex justify-center ', 'w-full', 'h-full', 'p-4')}>
      <div
        className={cls(
          'flex flex-col justify-stretch align-center',
          'w-full',
          'h-full',
          'bg-[#2F4858BB] rounded-xl',
          'p-4'
        )}
      >
        <div
          className={cls(
            'select-none',
            'text-[80px]',
            'uppercase',
            'w-[300px]',
            'text-center'
          )}
        >
          Shop
        </div>
        <div className={cls('h-full', 'grid grid-cols-1 gap-4 auto-rows-fr')}>
          <ShopContainer type="face" title="Face"></ShopContainer>
          <ShopContainer type="token" title="Token"></ShopContainer>
          <div className={cls('grid grid-cols-[300px,1fr] gap-4')}>
            <div
              className={cls(
                'w-[300px]',
                'bg-[#DEB887BB]',
                'p-4',
                'rounded-xl',
                'cursor-pointer'
              )}
            >
              <div
                className={cls('h-full', 'flex justify-around items-center')}
              >
                <Roll />
                <div className={cls('select-none', 'text-[63px] text-white')}>
                  5$
                </div>
              </div>
            </div>
            <ShopContainer type="passive" title="Passive"></ShopContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
