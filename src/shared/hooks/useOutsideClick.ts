import { RefObject, useEffect } from 'react';

type UseOutsideClickParams = {
  ref: RefObject<HTMLDivElement | HTMLButtonElement | null>;
  handler: () => void;
  enabled?: boolean;
};

export const useOutsideClick = ({ ref, handler, enabled = true }: UseOutsideClickParams): void => {
  useEffect(() => {
    if (!enabled) return;

    const listener = (e: MouseEvent | TouchEvent) => {
      if (ref.current?.contains(e.target as Node)) return;
      handler();
    };

    document.addEventListener('click', listener);
    document.addEventListener('touchend', listener);

    return () => {
      document.removeEventListener('click', listener);
      document.removeEventListener('touchend', listener);
    };
  }, [handler, enabled, ref]);
};
