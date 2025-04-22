import { RegisterForm } from "@/features/auth/components/register-form";
import { getServerUser } from "@/features/auth/services";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const user = await getServerUser();

  if (user) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <RegisterForm />
    </div>
  );
}
