import { SPINNER_SIZES } from '../constants';
import { SpinnerSizeType } from '../types';

export function getSpinnerStyles(size: SpinnerSizeType): string {
  const numberSize = SPINNER_SIZES[size];
  const borderSize = (numberSize * 3.9) / 32;

  return `
    w-[${numberSize}px]
    h-[${numberSize}px]
    border-[${borderSize}px]
  `;
}
