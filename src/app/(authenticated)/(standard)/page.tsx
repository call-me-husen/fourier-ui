"use client";

import Link from "next/link";
import {
  Clock,
  User,
  Calendar,
  Settings,
  ArrowRight,
  Users,
  UserCheck,
  Building2,
  Briefcase,
} from "lucide-react";
import AttendanceCard from "@/components/ui/dashboard/attendance-card";
import AttendanceStatistics from "@/components/ui/dashboard/attendance-statistics";
import { useAttendanceDashboard } from "@/hooks/attendance/use-attendace-api";
import { useEffect } from "react";
import { useUser } from "@/hooks/user/use-user";

const stats = [
  {
    label: "Total Employees",
    value: "125",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/25",
  },
  {
    label: "Present Today",
    value: "98",
    icon: UserCheck,
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/25",
  },
  {
    label: "Absent",
    value: "27",
    icon: Clock,
    gradient: "from-red-500 to-rose-500",
    shadow: "shadow-red-500/25",
  },
  {
    label: "Departments",
    value: "8",
    icon: Building2,
    gradient: "from-violet-500 to-purple-500",
    shadow: "shadow-violet-500/25",
  },
];

const features = [
  {
    title: "Profile Management",
    description: "View and edit your profile information",
    href: "/profile",
    icon: User,
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/25",
  },
  {
    title: "Attendance History",
    description: "View your past attendance records",
    href: "/attendance",
    icon: Calendar,
    gradient: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/25",
  },
  {
    title: "Settings",
    description: "Change password and preferences",
    href: "/settings",
    icon: Settings,
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/25",
  },
];

const adminFeatures = [
  {
    title: "Employee Management",
    description: "Manage employee records and profiles",
    href: "/admin/employees",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/25",
  },
  {
    title: "Department Management",
    description: "Manage departments and teams",
    href: "/admin/departments",
    icon: Building2,
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/25",
  },
  {
    title: "Job Position Management",
    description: "Manage job positions and roles",
    href: "/admin/job-positions",
    icon: Briefcase,
    gradient: "from-violet-500 to-purple-500",
    shadow: "shadow-violet-500/25",
  },
  {
    title: "Attendance Report",
    description: "View and export attendance reports",
    href: "/admin/attendance",
    icon: Calendar,
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/25",
  },
];

export default function EmployeeDashboard() {
  const { isAdmin, data: user } = useUser();
  const dashboardFeatures = isAdmin ? adminFeatures : features;
  const { fetcher, data } = useAttendanceDashboard();

  useEffect(() => {
    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold">
            Welcome back,{" "}
            <span className="bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {user?.firstName}
            </span>
            !
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Here&apos;s your attendance overview for today
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AttendanceCard
          isDayOff={data?.today.isHoliday}
          clockInTime={data?.today.clockIn}
          clockOutTime={data?.today.clockOut}
        />

        <AttendanceStatistics
          numberOfDayOffs={data?.stats.holiday || 0}
          numberOfAttendances={data?.stats.working || 0}
          numberOfAbsences={data?.stats.absent || 0}
          totalWorkingHours={
            data?.stats.formattedTotalWorkingHours || "00:00:00"
          }
        />
      </div>

      {isAdmin && (
        <div>
          <h2 className="text-xl font-semibold mb-5">Organization Stats</h2>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                style={{ animationDelay: `${index * 100}ms` }}
                className="group relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-2xl bg-linear-to-br ${stat.gradient} shadow-lg ${stat.shadow}`}
                  >
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-5">Quick Access</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {dashboardFeatures.map((feature, index) => (
            <Link
              key={feature.href}
              href={feature.href}
              style={{ animationDelay: `${index * 100}ms` }}
              className="group relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            >
              <div
                className={`inline-flex p-3 rounded-2xl bg-linear-to-br ${feature.gradient} shadow-lg mb-4 ${feature.shadow}`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {feature.description}
              </p>
              <div className="flex items-center text-sm font-medium text-indigo-500 group-hover:text-indigo-600 transition-colors">
                <span>Open</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
