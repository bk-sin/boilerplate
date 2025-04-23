import { getServerUser } from "@/features/auth/services";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getServerUser();

  if (!user) {
    return redirect("/login");
  } else {
    redirect("/dashboard/overview");
  }
}
