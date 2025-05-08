import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from 'react-hook-form';
import { Button, ButtonProps } from '../button/button';
import { Icon } from '../icon/icon';
import { Label } from '../label/label';
import { Spinner } from '../spinner/spinner';
import { cn } from '@/shared/lib';

const Form = FormProvider;

type TFormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<TFormFieldContextValue>({} as TFormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type TFormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<TFormItemContextValue>({} as TFormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn('space-y-1', className)}
          {...props}
        />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  },
);
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
      />
    );
  },
);
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn('text-sm font-medium text-destructive', className)}
        role="alert"
        {...props}
      >
        {body}
      </p>
    );
  },
);
FormMessage.displayName = 'FormMessage';

type TFormButtonProps = ButtonProps & { isLoading?: boolean; isSuccess?: boolean; isError?: boolean };

const FormButton = React.forwardRef<HTMLButtonElement, TFormButtonProps>(
  ({ isSuccess, isLoading, isError, children, className, ...props }, ref) => {
    let icon: null | React.ReactElement = null;
    if (isError) {
      icon = (
        <Icon
          name="triangle-alert"
          className="h-4 w-4"
        />
      );
    } else if (isSuccess) {
      icon = (
        <Icon
          name="check"
          className="h-4 w-4"
        />
      );
    } else if (isLoading) {
      icon = <Spinner />;
    }

    return (
      <Button
        ref={ref}
        type="submit"
        className={cn('gap-1.5', className)}
        variant={isError ? 'destructive' : 'default'}
        {...props}
      >
        {icon}
        {children}
      </Button>
    );
  },
);

FormButton.displayName = 'FormButton';

// eslint-disable-next-line react-refresh/only-export-components
export { Form, FormButton, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField };
