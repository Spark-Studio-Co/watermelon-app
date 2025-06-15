import { AuthLayout } from "../../layouts/auth-layout";
import { AccountCreationForm } from "@/src/features/account-creation-form/ui/account-creation-form";

export const AccountCreationScreen = () => {
  return (
    <AuthLayout>
      <AccountCreationForm />
    </AuthLayout>
  );
};
