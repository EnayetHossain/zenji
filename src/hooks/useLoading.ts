import { useContext } from "react";
import { LoadingContext, type LoadingContextType } from "@/context/loadingTypes";

/**
 * Custom hook to consume the loading state and control animation triggers.
 */
export function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
