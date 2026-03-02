"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  Calendar,
  Clock,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Waves,
} from "lucide-react";
import { useEffect, useState } from "react";
import cn from "@/lib/styles/cn";
import ThemeToggle from "../theme/theme-toggle";
import { useUser } from "@/hooks/user/use-user";
import { useSignOut } from "@/hooks/auth/use-auth-api";
import Image from "next/image";

const navbarItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/employees", label: "Employees", icon: Users },
  { href: "/admin/departments", label: "Departments", icon: Building2 },
  { href: "/admin/job-positions", label: "Job Positions", icon: Briefcase },
  { href: "/admin/attendances", label: "Attendance Report", icon: Calendar },
  { href: "/attendances", label: "Attendance History", icon: Clock },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavItemSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200">
      <div className="h-5 w-5 rounded bg-muted" />
      <div className="h-4 w-20 rounded bg-muted" />
    </div>
  );
}
export function Sidebar() {
  const pathname = usePathname();
  const { fetcher: signOut } = useSignOut();
  const { data: user, isAdmin, isLoading } = useUser();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = isAdmin
    ? navbarItems
    : navbarItems.filter((item) => !item.href.startsWith("/admin"));

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-40 p-2.5 rounded-xl bg-card border shadow-lg hover:shadow-xl transition-all lg:hidden"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-card/80 backdrop-blur-xl border-r border-border/50 shadow-2xl transform transition-all duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-20 items-center justify-between px-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
              <Waves className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Fourier
            </span>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-muted transition-colors lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-linear-to-br from-muted/50 to-muted/30">
            <div className="h-12 w-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              {
                user?.photoUrl ? (
                  <Image 
                    src={user.photoUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                ) :
              (<User className="h-6 w-6 text-white" />)
              }
            </div>
            <div className="flex-1 min-w-0">
              <>
                <p
                  className={cn([
                    "text-sm font-semibold truncate",
                    isLoading && "bg-muted h-4 w-20 mb-1",
                  ])}
                >
                  {user?.firstName} {user?.lastName}
                </p>
                <p
                  className={cn([
                    "text-xs text-muted-foreground truncate",
                    isLoading && "bg-muted h-3 w-20",
                  ])}
                >
                  {user?.email}
                </p>
              </>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1.5">
          {isLoading ? (
            <>
              {[...Array(5)].map((_, index) => (
                <NavItemSkeleton key={`skeleton-${index}`} />
              ))}
            </>
          ) : (
            navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                      : "hover:bg-muted/80 hover:translate-x-1",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })
          )}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50 space-y-1.5">
          <ThemeToggle />
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-destructive/10 hover:translate-x-1 text-destructive"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
