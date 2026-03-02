"use client";

import Link from "next/link";
import {
  Users,
  Building2,
  Briefcase,
  Calendar,
  Clock,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import cn from "@/lib/styles/cn";

const user = {
  firstName: "John",
  lastName: "Doe",
  email: "",
};

const features = [
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

export default function AdminDashboard() {
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

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {user?.firstName}
            </span>
            !
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Here&apos;s what&apos;s happening with your team today
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            style={{ animationDelay: `${index * 100}ms` }}
            className="group relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadow}`}
              >
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-5">Management Features</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Link
              key={feature.href}
              href={feature.href}
              style={{ animationDelay: `${index * 100}ms` }}
              className="group relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            >
              <div
                className={`inline-flex p-3 rounded-2xl bg-linear-to-br ${feature.gradient} shadow-lg ${feature.shadow} mb-4`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {feature.description}
              </p>
              <div className="flex items-center text-sm font-medium text-indigo-500 group-hover:text-indigo-600 transition-colors">
                <span>Manage</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
