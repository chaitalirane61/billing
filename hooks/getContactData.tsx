

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface ContactBody {
  fullName: string;
  email: string;
  phone: string;
  businessName?: string;
  heardAboutUs: string;
  message: string;
}

// Hook to submit contact form
export function useContactForm() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (body: ContactBody) => {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate leads query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

// Hook to fetch all leads
export function useLeads() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await fetch("/api/admin/leads");
      
      if (!res.ok) {
        throw new Error("Failed to fetch leads");
      }
      
      return res.json();
    },
  });
}