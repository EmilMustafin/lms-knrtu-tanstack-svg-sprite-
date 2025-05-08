import { Control, FieldValues, FormProvider } from 'react-hook-form'; // Добавьте FormProvider
import { useLoginForm } from '../../entities/user/auth/ui/useLoginForm';
import { ReactHookFormDevelopmentTools } from '../../shared/config/developmentTools';
import { FormButton, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../shared/ui/forms/form';
import { Input } from '@/shared/ui/input/input';

export const AuthLoginPage = () => {
  const {
    form,
    form: {
      formState: { isSubmitting },
      control,
    },
    onSubmit,
  } = useLoginForm({ defaultValues: { login: '', password: '' } });

  return (
    <FormProvider {...form}>
      <form
        className="mx-auto grid w-[350px] gap-6"
        onSubmit={void form.handleSubmit(onSubmit)} // Используйте form.handleSubmit
      >
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">Enter your email and password below to login.</p>
        </div>
        <div className="grid gap-6 text-sm">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel htmlFor="login">Логин</FormLabel>
                <FormControl>
                  <Input
                    id="login"
                    type="text"
                    placeholder="MMM42C"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <div className="flex items-center">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <div className="ml-auto inline-block leading-none underline">Забыли пароль?</div>
                </div>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormButton
            className="w-full"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Войти
          </FormButton>
        </div>
        {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to="/auth/signup"
              className="underline"
            >
              Sign up
            </Link>
          </div> */}
      </form>
      <ReactHookFormDevelopmentTools
        control={control as unknown as Control<FieldValues, any>}
        placement="top-left"
      />
    </FormProvider>
  );
};
