import { AdminSignInForm } from "@/components/admin-signin-form";
import AuthLayout from "../../auth/layout";

export default function AdminSignInPage() {
  return (
    <AuthLayout>
      <AdminSignInForm />
    </AuthLayout>
  );
}
