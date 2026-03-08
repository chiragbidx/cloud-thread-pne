import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import SubscriptionDemoPanel from "../../../components/SubscriptionDemoPanel";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Redirect unauthenticated users to login
  if (!session) redirect("/login");

  return (
    <main className="flex flex-col gap-8 px-4 md:px-10 py-8">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#FB7232]">Subscription Dashboard</h1>
          <p className="text-zinc-600">Welcome, {session.user?.email}</p>
        </div>
        <a
          href="/api/auth/signout"
          className="rounded bg-orange-200 text-[#fb7232] font-semibold px-4 py-2 hover:bg-orange-300 transition shadow"
        >
          Sign out
        </a>
      </header>
      {/* Subscription management UI */}
      <section className="mt-4">
        <SubscriptionDemoPanel />
      </section>
    </main>
  );
}