"use client";
import { createContext, PropsWithChildren, useRef } from "react";
import Snackbar from "../ui/common/snackbar";

type SnackbarContextType = {
  show: (
    message: string,
    opts?: { type?: "error" | "warn" | "success"; duration?: number },
  ) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

export default function SnackbarProvider({ children }: PropsWithChildren) {
  const snackbarRef = useRef<{ show: SnackbarContextType["show"] }>(null);

  const show = (
    message: string,
    opts: { type?: "error" | "warn" | "success"; duration?: number } = {
      type: "success",
      duration: 3000,
    }
  ) => {
    snackbarRef.current?.show(message, opts);
  }

  return (
    <SnackbarContext.Provider value={{ show }}>
      <Snackbar ref={snackbarRef} />
      {children}
    </SnackbarContext.Provider>
  );
}