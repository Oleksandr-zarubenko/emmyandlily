"use client";
import { useEffect } from "react";

export function ClearLocalStorage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  }, []);

  return null;
}
