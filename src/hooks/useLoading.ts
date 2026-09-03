import { useContext } from "react";
import { LoadingContext, type LoadingContextType } from "@/context/loadingTypes";

export function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
