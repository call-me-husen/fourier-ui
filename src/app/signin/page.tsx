"use client";

import { Suspense } from "react";
import { Loader2, Waves } from "lucide-react";
import ThemeToggle from "@/components/ui/theme/theme-toggle";
import SignInForm from "@/components/ui/signin/sign-in-form";

function SignInPage() {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20 dark:from-indigo-500/10 dark:via-purple-500/5 dark:to-pink-500/10" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl" />

      <ThemeToggle />

      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="max-w-md text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/30 mb-6">
            <Waves className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Fourier
          </h1>
          <p className="text-lg text-muted-foreground">
            Employee Attendance Management System
          </p>
          <div className="flex items-center justify-center gap-8 pt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-500">99%</p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">24/7</p>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-pink-500">100%</p>
              <p className="text-sm text-muted-foreground">Secure</p>
            </div>
          </div>
        </div>
      </div>

      <SignInForm />
    </div>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-4 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-2xl">
        <Loader2 className="h-10 w-10 animate-spin text-white" />
      </div>
    </div>
  );
}

export default function SignInWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <SignInPage />
    </Suspense>
  );
}
