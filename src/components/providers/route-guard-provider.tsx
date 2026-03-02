import { useUser } from "@/hooks/user/use-user";
import { PropsWithChildren, useEffect, useRef } from "react";

export default function RouteGuardProvider({children}: PropsWithChildren) {
  const redirectRef = useRef<number | null>(null);
  const {
    isLoading,
    data: user,
    isAdmin,
    isAuthenticated
  } = useUser()

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!isLoading) {
      if (!isAuthenticated) {
        redirectRef.current = window.setTimeout(() => {
          window.location.href = `/signin?redirect=${currentPath}`;
        }, 50);
      } else if (currentPath.startsWith("/admin") && !isAdmin) {
        if (redirectRef.current) {
          clearTimeout(redirectRef.current);
        }
        window.location.href = "/";
      }else {
        if (redirectRef.current) {
          clearTimeout(redirectRef.current);
        }
      }
    }
    return () => {
      if (redirectRef.current) {
        clearTimeout(redirectRef.current);
      }
    };
  }, [user, isLoading, isAuthenticated, isAdmin]);

  return (
    <>{children}</>
  )
}