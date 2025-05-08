import { FunctionComponent } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { getSpinnerStyles } from './utils/get-spinner-styles';

type SpinnerSizeType = 'xs' | 'sm' | 'md' | 'lg';
type SpinnerProps = {
  color?: string;
  size?: SpinnerSizeType;
};

const spinnerClasses = cva('animate-spin rounded-full', {
  variants: {
    size: {
      xs: getSpinnerStyles('xs'),
      sm: getSpinnerStyles('sm'),
      md: getSpinnerStyles('md'),
      lg: getSpinnerStyles('lg'),
    },
    color: {
      primary: 'border-gray-200 border-t-primary',
      secondary: 'border-gray-200 border-t-secondary',
      custom: '', // Для произвольного цвета можно передать через `style`
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

const Spinner: FunctionComponent<SpinnerProps & VariantProps<typeof spinnerClasses>> = ({
  color = 'currentColor',
  size = 'md',
}) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div
        className={spinnerClasses({ size })}
        style={{
          borderTopColor: color,
        }}
      />
    </div>
  );
};

export { Spinner, type SpinnerProps };
