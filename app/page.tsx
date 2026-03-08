import { AgentActionPanel } from "../components/AgentActionPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-[#ffe6d8] text-zinc-900">
      <main className="flex min-h-screen w-full flex-col gap-12 px-6 py-12 sm:px-10 lg:px-16 lg:max-w-[1600px] lg:mx-auto">
        {/* Header: SubscriFlow wordmark and SaaS action buttons */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-[#fb7232]/30 bg-white px-5 py-2 shadow-sm">
              <span className="text-2xl font-black tracking-tight text-[#fb7232]">SubscriFlow</span>
            </div>
            <p className="text-sm font-medium text-[#c75829] sm:text-base">
              Subscription management made effortless.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end w-full sm:w-auto">
            <a
              href="#demo"
              className="w-full sm:w-auto text-center rounded-full border border-[#fb7232]/30 bg-white px-4 py-2 text-sm font-semibold text-[#c75829] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Dashboard Demo
            </a>
            <a
              href="mailto:chirag@bidx.ai"
              className="w-full sm:w-auto text-center rounded-full bg-[#fb7232] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md"
            >
              Contact
            </a>
          </div>
        </header>
        {/* Hero Section */}
        <section className="grid min-h-[520px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232] shadow-sm">
              SaaS Subscription Dashboard
            </p>
            <h1 className="text-4xl font-black leading-tight text-[#291200] sm:text-5xl">
              Manage subscriptions with clarity and control.
            </h1>
            <p className="max-w-3xl text-lg leading-7 text-zinc-700">
              SubscriFlow empowers support and finance teams to view, update, refund, and cancel subscriptions—all in one elegant dashboard. Reduce manual effort, resolve issues faster, and improve customer satisfaction.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap sm:gap-4 w-full">
              <a
                href="#features"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-[#fb7232] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md"
              >
                Explore features
              </a>
              <a
                href="#demo"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-[#fb7232]/30 bg-white px-5 py-3 text-sm font-semibold text-[#c75829] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Live subscription demo
              </a>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="relative overflow-hidden rounded-2xl border border-[#fb7232]/30 bg-white shadow-md" id="features">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffe7dd] via-white to-[#ffd9c6] opacity-70" aria-hidden />
            <div className="relative grid gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-[#fb7232]/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#fb7232]">View</p>
                <p className="mt-2 text-base font-semibold text-[#4b1f0a]">All Subscriptions</p>
                <p className="text-sm text-zinc-600">
                  Instantly access subscription records and filter users or plans.
                </p>
              </div>
              <div className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-[#fb7232]/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#fb7232]">Change</p>
                <p className="mt-2 text-base font-semibold text-[#4b1f0a]">Modify Plan</p>
                <p className="text-sm text-zinc-600">
                  Seamlessly upgrade, downgrade, or switch customer plans.
                </p>
              </div>
              <div className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-[#fb7232]/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#fb7232]">Refund</p>
                <p className="mt-2 text-base font-semibold text-[#4b1f0a]">Process Payments</p>
                <p className="text-sm text-zinc-600">
                  Issue full or partial refunds with clear audit logging.
                </p>
              </div>
              <div className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-[#fb7232]/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#fb7232]">Cancel</p>
                <p className="mt-2 text-base font-semibold text-[#4b1f0a]">End Subscriptions</p>
                <p className="text-sm text-zinc-600">
                  Quickly cancel, pause, or resume active subscriptions.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Demo Panel (Client-side Interactive Island) */}
        <section className="rounded-2xl border border-[#fb7232]/20 bg-white/80 px-6 py-8 shadow-sm sm:px-10" id="demo">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Demo Description */}
            <div className="space-y-2 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232]">Live Demo</p>
              <h3 className="text-xl font-bold text-[#341404]">Subscription Explorer</h3>
              <p className="text-sm text-[#6a3515]">
                Search, filter, and take instant actions on your active subscriptions. (Mock data powered for demo—backend wiring in a snap.)
              </p>
            </div>
            <div className="w-full max-w-xl">
              <SubscriptionDemoPanel />
            </div>
          </div>
        </section>
        {/* Footer-style CTA: condensed link lists + reassurance line */}
        <section
          id="cta"
          className="rounded-2xl border border-[#fb7232]/15 bg-gradient-to-br from-white via-[#fff5ee] to-white px-6 py-12 text-[#33170a] shadow-sm sm:px-12"
        >
          <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232]">SubscriFlow</p>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Intuitive control, transparent records.</h2>
              <p className="text-base text-[#6a3515]">
                Built for support and finance professionals. Modern, responsive, extensible SaaS tooling designed by Chirag Dodiya.
              </p>
            </div>
            <div className="grid gap-4 rounded-xl border border-[#fb7232]/20 bg-white/80 p-6 text-sm shadow-sm sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c75829]">Product</p>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="#features">
                  Features
                </a>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="#demo">
                  Demo
                </a>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="mailto:chirag@bidx.ai">
                  Contact
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c75829]">Resources</p>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="mailto:chirag@bidx.ai">
                  Support
                </a>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="https://github.com/">
                  GitHub
                </a>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="https://vercel.com/templates">
                  Templates
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center border-t border-[#fb7232]/15 pt-6 text-center text-xs text-[#6a3515]">
            <span>
              &copy; {new Date().getFullYear()} SubscriFlow by Chirag Dodiya • chirag@bidx.ai &nbsp;|&nbsp; MIT licensed
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

// Client-only: SaaS subscription explorer demo island
"use client";
import { useState } from "react";

// Demo/mock data
const demoSubscriptions = [
  {
    id: "sub_5f9a",
    customer: "Amelia Harper",
    email: "amelia.harper@mail.com",
    plan: "Pro",
    status: "Active",
    price: "$49",
    nextRenewal: "2024-12-05",
  },
  {
    id: "sub_3cde",
    customer: "Samuel Martin",
    email: "samuel.martin@mail.com",
    plan: "Basic",
    status: "Paused",
    price: "$19",
    nextRenewal: "2024-08-22",
  },
  {
    id: "sub_783z",
    customer: "Kim Lee",
    email: "kim.lee@mail.com",
    plan: "Enterprise",
    status: "Active",
    price: "$249",
    nextRenewal: "2024-10-09",
  },
  {
    id: "sub_92bf",
    customer: "Priya Shah",
    email: "priya.shah@mail.com",
    plan: "Pro",
    status: "Canceled",
    price: "$49",
    nextRenewal: "-",
  },
  {
    id: "sub_85xt",
    customer: "David Yuan",
    email: "david.yuan@mail.com",
    plan: "Pro",
    status: "Active",
    price: "$49",
    nextRenewal: "2024-09-15",
  },
];

function SubscriptionDemoPanel() {
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter subscriptions by customer name, plan, or status
  const filtered = demoSubscriptions.filter((s) =>
    [s.customer, s.plan, s.status].join(" ").toLowerCase().includes(filter.toLowerCase())
  );

  // Simulate loading for user experience
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
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
        >
          Search
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
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#FB7232] font-bold">
                  Loading subscriptions…
                </td>
              </tr>
            ) : filtered.length > 0 ? (
              filtered.map((sub) => (
                <tr key={sub.id}>
                  <td className="px-2 py-1 whitespace-nowrap">{sub.customer}</td>
                  <td className="px-2 py-1 whitespace-nowrap">{sub.email}</td>
                  <td className="px-2 py-1 whitespace-nowrap">{sub.plan}</td>
                  <td className={`px-2 py-1 whitespace-nowrap font-bold ${sub.status === "Active" ? "text-green-700" : sub.status === "Paused" ? "text-yellow-600" : "text-red-600"}`}>
                    {sub.status}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap">{sub.price}</td>
                  <td className="px-2 py-1 whitespace-nowrap">{sub.nextRenewal}</td>
                  <td className="px-2 py-1 whitespace-nowrap">
                    <DemoActionButtons status={sub.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center italic text-zinc-400">
                  No subscriptions found.
                </td>
              </tr>
            )}
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