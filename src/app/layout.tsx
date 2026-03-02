import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import UserProvider from "@/components/providers/user-provider";
import SnackbarProvider from "@/components/providers/snackbar-provider";

const interLatin = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Fourier - Attendance Management",
  description: "Employee attendance management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interLatin.variable}antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SnackbarProvider>
            <UserProvider>

              {children}
            </UserProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
