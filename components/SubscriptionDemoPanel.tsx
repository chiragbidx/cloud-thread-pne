"use client";
import { useState, useEffect, useTransition } from "react";

// Define the shape (should match lib/db/subscriptions)
type Subscription = {
  id: string;
  customer: string;
  email: string;
  plan: string;
  status: string;
  price: number;
  nextRenewal: string;
  createdAt: string;
  updatedAt: string;
};

export default function SubscriptionDemoPanel() {
  const [filter, setFilter] = useState("");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Load subscriptions from server action API
  async function fetchSubscriptions(query?: string) {
    setLoading(true);
    try {
      const params = query ? `?search=${encodeURIComponent(query)}` : "";
      const res = await fetch(`/api/subscriptions${params}`, { cache: "no-store" });
      if (res.ok) {
        const subs = await res.json();
        setSubscriptions(subs);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Search handler
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      fetchSubscriptions(filter);
    });
  }

  return (
    <div className="rounded-xl border border-[#fb7232]/30 bg-white px-4 py-4 shadow-sm">
      <form className="flex items-center gap-2 mb-4" onSubmit={handleSearch} autoComplete="off">
        <input
          type="text"
          className="flex-1 rounded-lg border border-[#fb7232]/30 bg-white px-3 py-2 text-sm text-[#33170a] outline-none ring-0 transition focus:border-[#fb7232] focus:shadow-[0_0_0_3px_rgba(251,114,50,0.12)]"
          placeholder="Search by customer, plan, or status…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded bg-[#fb7232] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#e06225]"
          disabled={isPending || loading}
        >
          {isPending || loading ? "Searching…" : "Search"}
        </button>
      </form>
      <div className="overflow-x-auto font-mono">
        <table className="min-w-full border-separate border-spacing-y-1 text-xs">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left font-semibold text-[#c75829]">Customer</th>
              <th className="px-2 py-1 text-left font-semibold text-[#c75829]">Email</th>
              <th className="px-2 py-1 text-left font-semibold text-[#c75829]">Plan</th>
              <th className="px-2 py-1 text-left font-semibold text-[#c75829]">Status</th>
              <th className="px-2 py-1 text-left font-semibold text-[#c75829]">Price</th>
              <th className="px-2 py-1 text-left font-semibold text-[#c75829]">Next Renewal</th>
              <th className="px-2 py-1 text-left font-semibold text-[#c75829]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#FB7232] font-bold">
                  Loading subscriptions…
                </td>
              </tr>
            )}
            {!loading && subscriptions.length > 0 ? (
              subscriptions.map((sub) => (
                <tr key={sub.id}>
                  <td className="px-2 py-1 whitespace-nowrap">{sub.customer}</td>
                  <td className="px-2 py-1 whitespace-nowrap">{sub.email}</td>
                  <td className="px-2 py-1 whitespace-nowrap">{sub.plan}</td>
                  <td className={`px-2 py-1 whitespace-nowrap font-bold ${sub.status === "Active" ? "text-green-700" : sub.status === "Paused" ? "text-yellow-600" : "text-red-600"}`}>
                    {sub.status}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap">${sub.price}</td>
                  <td className="px-2 py-1 whitespace-nowrap">{sub.nextRenewal}</td>
                  <td className="px-2 py-1 whitespace-nowrap">
                    <DemoActionButtons status={sub.status} />
                  </td>
                </tr>
              ))
            ) : !loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center italic text-zinc-400">
                  No subscriptions found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Demo Actions: UI preview only for now
function DemoActionButtons({ status }: { status: string }) {
  return (
    <div className="flex flex-wrap gap-1">
      {status === "Active" && (
        <>
          <button className="rounded border-none bg-[#fb7232]/90 px-2 py-1 text-xs font-bold text-white shadow-sm" title="Change plan" disabled>
            Change
          </button>
          <button className="rounded border-none bg-[#e06225]/90 px-2 py-1 text-xs font-bold text-white shadow-sm" title="Refund payment" disabled>
            Refund
          </button>
          <button className="rounded border-none bg-[#D62828] px-2 py-1 text-xs font-bold text-white shadow-sm" title="Cancel subscription" disabled>
            Cancel
          </button>
        </>
      )}
      {status === "Paused" && (
        <button className="rounded border-none bg-[#fb7232]/70 px-2 py-1 text-xs font-bold text-white shadow-sm" title="Resume subscription" disabled>
          Resume
        </button>
      )}
      {status === "Canceled" && (
        <span className="px-2 py-1 text-xs text-zinc-400 font-semibold" title="No actions available">
          —
        </span>
      )}
    </div>
  );
}