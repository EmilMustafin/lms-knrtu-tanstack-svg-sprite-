import { RefObject } from 'react';

export type PopoverPositionType =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'right-top'
  | 'right-bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom';

export type PopoverTriggerType = 'hover' | 'click';
export type TriggerProps = {
  'aria-expanded': boolean;
  ref: RefObject<HTMLDivElement | null>;
  onMouseEnter?: () => void;
  onClick?: () => void;
};
