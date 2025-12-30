
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface SubscribeBody {
  email: string;
}

export function useSubscriberForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: SubscribeBody) => {
      const res = await fetch("/api/admin/subscribers", {   // ✔ FIXED
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
    },
  });
}

export function useSubscribersQuery() {
  return useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await fetch("/api/admin/subscribers");   // ✔ FIXED

      if (!res.ok) {
        throw new Error("Failed to fetch subscribers");
      }

      return res.json();
    },
  });
}
