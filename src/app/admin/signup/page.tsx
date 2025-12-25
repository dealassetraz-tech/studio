import { AdminSignUpForm } from "@/components/admin-signup-form";
import AuthLayout from "../../auth/layout";

export default function AdminSignUpPage() {
  return (
    <AuthLayout>
      <AdminSignUpForm />
    </AuthLayout>
  );
}
