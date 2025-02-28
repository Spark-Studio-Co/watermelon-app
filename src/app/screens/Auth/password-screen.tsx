
import { AuthLayout } from '../../layouts/auth-layout';
import { PasswordForm } from '@/src/features/password-creation-form/ui/password-creation-form';

export const PasswordScreen = () => {
    return (
        <AuthLayout>
            <PasswordForm />
        </AuthLayout>
    );
};
