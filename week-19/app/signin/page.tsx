import Signin from "@/components/Signin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SigninPage() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/");
  }

  return <Signin />;
}
