
import { AuthLayout } from '../layouts/auth-layout';
import { LoginForm } from '@/src/features/login-form/ui/login-form';

export const LoginScreen = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
