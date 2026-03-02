"use client";
import { useEmployeeProfile } from "@/hooks/employee/use-employee-api";
import { EmployeeProfileResponse } from "@/services/employee";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";


type UserContextType = {
  data: EmployeeProfileResponse | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setUser: Dispatch<SetStateAction<EmployeeProfileResponse | null>>;
}
export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<EmployeeProfileResponse | null>(null);
  const { fetcher: getEmployeeProfile, isLoading, error} = useEmployeeProfile({
    onSuccess: (data) => {
      setUser(data);
    }
  });

  useEffect(() => {
    getEmployeeProfile()
  }, [])

  const contextValue: UserContextType = {
    data: user,
    isLoading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin" || false,
    setUser
  };
  
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}