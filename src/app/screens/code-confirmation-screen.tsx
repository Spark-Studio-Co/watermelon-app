
import { AuthLayout } from '../layouts/auth-layout';
import { CodeConfirmationForm } from '@/src/features/code-confirmation-form/ui/code-confirmation-form';

export const CodeConfirmationScreen = () => {
    return (
        <AuthLayout>
            <CodeConfirmationForm />
        </AuthLayout>
    );
};
