
import { AuthLayout } from '../layouts/auth-layout';
import { RegistrationForm } from '@/src/features/registration-form/ui/registration-form';

export const RegistrationScreen = () => {
    return (
        <AuthLayout>
            <RegistrationForm />
        </AuthLayout>
    );
};
