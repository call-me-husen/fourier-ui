"use client";

import RouteGuardProvider from "@/components/providers/route-guard-provider";
import { Sidebar } from "@/components/ui/common/sidebar";
// import { Sidebar } from "@/components/Sidebar";
// import { useRequireAuth } from "@/components/RoleGuard";
import { PropsWithChildren } from "react";

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  // useRequireAuth(["standard", "admin"]);

  return (
    <RouteGuardProvider>
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:pl-72">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
    </RouteGuardProvider>
  );
}
