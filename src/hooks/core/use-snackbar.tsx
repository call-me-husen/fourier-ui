import { SnackbarContext } from "@/components/providers/snackbar-provider";
import { useContext } from "react";

export default function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}