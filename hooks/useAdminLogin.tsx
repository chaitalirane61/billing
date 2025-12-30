"use client";

import { useMutation } from "@tanstack/react-query";

export function useAdminLogin() {
  return useMutation({
    mutationFn: async (body: { username: string; password: string }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      return data;
    },
  });
}