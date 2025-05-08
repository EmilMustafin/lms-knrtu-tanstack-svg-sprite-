import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { authApi } from '../api/user-auth-api';
import { useAuthStore } from '../model/store';
import { AuthResponse, LoginCredentials } from '../model/types';
// import { ApiError } from '@/shared/api/auth-user/api-instance';

const loginFormSchema = z.object({
  login: z.string().email('Invalid login'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

type UseLoginFormProps = {
  defaultValues?: DefaultValues<LoginFormData>;
};

export const useLoginForm = ({ defaultValues }: UseLoginFormProps = {}) => {
  const router = useRouter();
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const { mutateAsync } = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data: AuthResponse) => {
      login(data);
      await router.invalidate();
      void navigate({ to: '/app' });
    },
    // onError: async (error: ApiError) => {
    //   // const errorData = await error.response.json();
    //   console.error('Login error:', errorData);
    // },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const credentials: LoginCredentials = {
        login: data.login,
        password: data.password,
      };
      await mutateAsync(credentials);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
  };
};
