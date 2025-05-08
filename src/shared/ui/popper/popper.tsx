import {
  FunctionComponent,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  isValidElement,
  cloneElement,
  ReactElement,
} from 'react';
import { cva } from 'class-variance-authority';
import { createPortal } from 'react-dom';
import { PopoverPositionType, PopoverTriggerType, TriggerProps } from './types';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { cn } from '../../lib';

type PopperProps = {
  children: ReactNode;
  trigger: ReactNode | (({ isOpen }: { isOpen: boolean }) => ReactNode);
  position: PopoverPositionType;
  triggerMode?: PopoverTriggerType;
  withTriggerWidth?: boolean;
  gap?: number;
  closeOnResize?: boolean;
  closeOnEscape?: boolean;
};

type CoordsType = {
  top: number;
  left: number;
};

const transitionDuration = 200; // Время анимации в миллисекундах

const popperStyles = cva('absolute z-50 transform transition-transform duration-200 ease-in-out', {
  variants: {
    isOpen: {
      true: 'scale-100 opacity-100',
      false: 'scale-90 opacity-0',
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

const Popper: FunctionComponent<PopperProps> = ({
  children,
  trigger,
  position,
  triggerMode = 'hover',
  gap = 0,
  withTriggerWidth = false,
  closeOnResize = true,
  closeOnEscape = true,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const [coords, setCoords] = useState<CoordsType | undefined>(undefined);
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>(undefined);

  const { isOpen, onOpen, onClose, onToggle, isUnmounting } = useDisclosure({
    timeout: transitionDuration,
    closeOnResize,
    closeOnEscape,
  });

  useOutsideClick({
    ref: popperRef,
    handler: onClose,
    enabled: isOpen && triggerMode === 'click',
  });

  useEffect(() => {
    if (!isOpen || triggerMode === 'click') return;

    const listener = (e: MouseEvent | TouchEvent) => {
      if (!triggerRef.current?.contains(e.target as Node) && !popperRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousemove', listener);
    return () => {
      document.removeEventListener('mousemove', listener);
    };
  }, [isOpen, onClose, triggerMode]);

  useLayoutEffect(() => {
    if (!triggerRef.current || !popperRef.current) return;

    const {
      top: triggerTop,
      left: triggerLeft,
      width: triggerWidth,
      height: triggerHeight,
    } = triggerRef.current.getBoundingClientRect();

    const popoverWidth = popperRef.current.offsetWidth;
    const popoverHeight = popperRef.current.offsetHeight;

    const positions: Record<PopoverPositionType, CoordsType> = {
      top: {
        top: triggerTop - popoverHeight - gap,
        left: triggerLeft + (triggerWidth - popoverWidth) / 2,
      },
      right: {
        top: triggerTop + (triggerHeight - popoverHeight) / 2,
        left: triggerLeft + triggerWidth + gap,
      },
      bottom: {
        top: triggerTop + triggerHeight + gap,
        left: triggerLeft + (triggerWidth - popoverWidth) / 2,
      },
      left: {
        top: triggerTop + (triggerHeight - popoverHeight) / 2,
        left: triggerLeft - popoverWidth - gap,
      },
      'top-left': {
        top: triggerTop - popoverHeight - gap,
        left: triggerLeft,
      },
      'top-right': {
        top: triggerTop - popoverHeight - gap,
        left: triggerLeft + triggerWidth - popoverWidth,
      },
      'right-top': {
        top: triggerTop,
        left: triggerLeft + triggerWidth + gap,
      },
      'right-bottom': {
        top: triggerTop + triggerHeight - popoverHeight,
        left: triggerLeft + triggerWidth + gap,
      },
      'bottom-left': {
        top: triggerTop + triggerHeight + gap,
        left: triggerLeft,
      },
      'bottom-right': {
        top: triggerTop + triggerHeight + gap,
        left: triggerLeft + triggerWidth - popoverWidth,
      },
      'left-top': {
        top: triggerTop,
        left: triggerLeft - popoverWidth - gap,
      },
      'left-bottom': {
        top: triggerTop + triggerHeight - popoverHeight,
        left: triggerLeft - popoverWidth - gap,
      },
    };

    setCoords(positions[position]);
  }, [position, isOpen, gap]);

  useLayoutEffect(() => {
    if (!triggerRef.current || !withTriggerWidth) return;
    setTriggerWidth(triggerRef.current.offsetWidth);
  }, [withTriggerWidth]);

  const openProps = {
    ...(triggerMode === 'hover' ? { onMouseEnter: onOpen } : { onClick: onToggle }),
  };

  const triggerComponent = (() => {
    const parsedTrigger = typeof trigger === 'function' ? trigger({ isOpen }) : trigger;

    if (!isValidElement(parsedTrigger)) return null;
    return cloneElement(
      parsedTrigger as ReactElement,
      {
        ...openProps,
        'aria-expanded': isOpen,
        ref: triggerRef,
      } as TriggerProps,
    );
  })();

  return (
    <>
      {triggerComponent}
      {isOpen &&
        createPortal(
          <div
            ref={popperRef}
            className={cn(popperStyles({ isOpen: !isUnmounting }), triggerWidth ? 'w-full' : '')}
            style={{
              top: coords?.top ?? 0,
              left: coords?.left ?? 0,
            }}
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  );
};

export { Popper, type PopperProps };
