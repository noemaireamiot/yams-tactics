import { useState } from 'react';
import './tooltip.scss';
import {
  autoPlacement,
  offset,
  useFloating,
  useHover,
} from '@floating-ui/react';

interface TooltipProps {
  content: JSX.Element | string;
  children: JSX.Element | string;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    middleware: [autoPlacement(), offset(10)],
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  useHover(context);

  return (
    <div ref={refs.setReference}>
      {children}
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={'tooltip'}
        >
          {content}
        </div>
      )}
    </div>
  );
}
