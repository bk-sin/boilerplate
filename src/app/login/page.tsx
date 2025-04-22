import { LoginForm } from "@/features/auth/components/login-form";
import { getServerUser } from "@/features/auth/services";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getServerUser();

  if (user) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
