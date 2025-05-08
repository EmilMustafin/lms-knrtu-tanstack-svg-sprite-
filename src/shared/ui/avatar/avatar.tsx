import { FunctionComponent } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { useBoolean } from '../../hooks/use-boolean';

type AvatarProps = {
  name: string;
  src?: string;
} & VariantProps<typeof avatarStyles>;

const avatarStyles = cva('flex items-center justify-center overflow-hidden', {
  variants: {
    size: {
      xs: 'h-8 w-8',
      sm: 'h-12 w-12',
      md: 'h-16 w-16',
      lg: 'h-20 w-20',
      xl: 'h-24 w-24',
      '2xl': 'h-28 w-28',
      '3xl': 'h-32 w-32',
    },
    shape: {
      square: 'rounded-none',
      rounded: 'rounded-md',
      circle: 'rounded-full',
    },
    isError: {
      true: 'bg-black text-white',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
    isError: false,
  },
});

const Avatar: FunctionComponent<AvatarProps> = ({ name, src, size = 'md', shape = 'circle', ...restProps }) => {
  const [isError, setError] = useBoolean(!src);

  const handleError = () => {
    setError.on();
  };

  const symbols = name
    .split(' ')
    .map((string) => string.charAt(0))
    .join('');

  return (
    <div
      className={avatarStyles({ size, shape, isError })}
      {...restProps}
    >
      {isError ? (
        <span className="uppercase">{symbols}</span>
      ) : (
        <img
          className="rounded-inherit"
          src={src}
          alt={name}
          onError={handleError}
        />
      )}
    </div>
  );
};

export { Avatar, type AvatarProps };
