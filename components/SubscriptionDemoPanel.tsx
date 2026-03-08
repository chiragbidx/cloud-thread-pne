"use client";
import { useState, useEffect, useTransition } from "react";

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

const defaultNewSub: Omit<Subscription, "id" | "createdAt" | "updatedAt"> = {
  customer: "",
  email: "",
  plan: "",
  status: "",
  price: 0,
  nextRenewal: "",
};

export default function SubscriptionDemoPanel() {
  const [filter, setFilter] = useState("");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);
  const [newSub, setNewSub] = useState(defaultNewSub);
  const [editId, setEditId] = useState<string | null>(null);
  const [editSub, setEditSub] = useState(defaultNewSub);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

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

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      fetchSubscriptions(filter);
    });
  }

  // --- Add Subscription ---
  function handleShowAdd() {
    setShowAdd(true);
    setNewSub(defaultNewSub);
    setActionError(null);
    setActionMsg(null);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setActionMsg(null);
    setActionError(null);
    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSub),
      });
      if (res.ok) {
        setActionMsg("Subscription added.");
        setShowAdd(false);
        await fetchSubscriptions();
      } else {
        const err = await res.json();
        setActionError(err.error || "Failed to add subscription.");
      }
    } catch {
      setActionError("Failed to reach server.");
    }
  }

  // --- Edit Subscription ---
  function startEdit(sub: Subscription) {
    setEditId(sub.id);
    setEditSub({
      customer: sub.customer,
      email: sub.email,
      plan: sub.plan,
      status: sub.status,
      price: sub.price,
      nextRenewal: sub.nextRenewal,
    });
    setActionMsg(null);
    setActionError(null);
  }

  function cancelEdit() {
    setEditId(null);
    setEditSub(defaultNewSub);
    setActionMsg(null);
    setActionError(null);
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    setActionMsg(null);
    setActionError(null);
    try {
      const res = await fetch(`/api/subscriptions?id=${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editSub),
      });
      if (res.ok) {
        setActionMsg("Subscription updated.");
        setEditId(null);
        setEditSub(defaultNewSub);
        await fetchSubscriptions();
      } else {
        const err = await res.json();
        setActionError(err.error || "Failed to update subscription.");
      }
    } catch {
      setActionError("Failed to reach server.");
    }
  }

  return (
    <div className="rounded-xl border border-[#fb7232]/30 bg-white px-4 py-6 shadow-sm">
      <div className="flex flex-wrap mb-4 items-center justify-between gap-2">
        <form className="flex items-center gap-2 flex-1 min-w-[260px]" onSubmit={handleSearch} autoComplete="off">
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
        <button
          className="inline-flex items-center rounded bg-[#fb7232] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e06225]"
          onClick={handleShowAdd}
        >
          + Add Subscription
        </button>
      </div>
      {actionMsg && <div className="mb-2 px-2 py-1 bg-green-50 text-green-700 rounded">{actionMsg}</div>}
      {actionError && <div className="mb-2 px-2 py-1 bg-red-50 text-red-700 rounded">{actionError}</div>}
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-4 flex flex-wrap gap-3 items-end p-3 rounded bg-[#fff7f3] border border-[#fb7232]/30">
          <FormFields state={newSub} setState={setNewSub} />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 rounded bg-[#fb7232] text-white font-semibold">
              Save
            </button>
            <button type="button" className="px-3 py-2 rounded bg-gray-100 font-semibold" onClick={() => setShowAdd(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
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
              subscriptions.map((sub) =>
                editId === sub.id ? (
                  <tr key={sub.id} className="bg-yellow-50">
                    <td colSpan={7} className="p-0">
                      <form onSubmit={handleEdit} className="flex flex-wrap gap-3 items-end p-3">
                        <FormFields state={editSub} setState={setEditSub} />
                        <div className="flex gap-2 mb-1">
                          <button type="submit" className="px-4 py-2 rounded bg-[#fb7232] text-white font-semibold">
                            Update
                          </button>
                          <button type="button" className="px-3 py-2 rounded bg-gray-100 font-semibold" onClick={cancelEdit}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                ) : (
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
                      <div className="flex flex-wrap gap-1">
                        <button
                          className="rounded border-none bg-[#fb7232]/80 px-2 py-1 text-xs font-bold text-white shadow-sm"
                          title="Edit subscription"
                          onClick={() => startEdit(sub)}
                        >
                          Edit
                        </button>
                        <DemoActionButtons status={sub.status} />
                      </div>
                    </td>
                  </tr>
                )
              )
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

// Shared fields for new/edit forms
function FormFields({
  state,
  setState,
}: {
  state: {
    customer: string;
    email: string;
    plan: string;
    status: string;
    price: number;
    nextRenewal: string;
  };
  setState: (v: any) => void;
}) {
  return (
    <>
      <input
        required
        type="text"
        placeholder="Customer"
        className="min-w-[110px] rounded border border-[#fb7232]/30 px-2 py-1"
        value={state.customer}
        onChange={(e) => setState((s: any) => ({ ...s, customer: e.target.value }))}
      />
      <input
        required
        type="email"
        placeholder="Email"
        className="min-w-[140px] rounded border border-[#fb7232]/30 px-2 py-1"
        value={state.email}
        onChange={(e) => setState((s: any) => ({ ...s, email: e.target.value }))}
      />
      <input
        required
        type="text"
        placeholder="Plan"
        className="min-w-[90px] rounded border border-[#fb7232]/30 px-2 py-1"
        value={state.plan}
        onChange={(e) => setState((s: any) => ({ ...s, plan: e.target.value }))}
      />
      <input
        required
        type="text"
        placeholder="Status"
        className="min-w-[90px] rounded border border-[#fb7232]/30 px-2 py-1"
        value={state.status}
        onChange={(e) => setState((s: any) => ({ ...s, status: e.target.value }))}
      />
      <input
        required
        type="number"
        placeholder="Price"
        className="min-w-[70px] rounded border border-[#fb7232]/30 px-2 py-1"
        min={0}
        value={state.price}
        onChange={(e) => setState((s: any) => ({ ...s, price: Number(e.target.value) }))}
      />
      <input
        required
        type="text"
        placeholder="Next Renewal"
        className="min-w-[120px] rounded border border-[#fb7232]/30 px-2 py-1"
        value={state.nextRenewal}
        onChange={(e) => setState((s: any) => ({ ...s, nextRenewal: e.target.value }))}
      />
    </>
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