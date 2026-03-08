import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white">
      {children}
    </div>
  );
}