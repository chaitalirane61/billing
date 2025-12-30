"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { localApi } from "@/api-client/localApiClient";

interface ContactBody {
  fullName: string;
  email?: string;
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
      try {
        const response = await localApi().post("/api/admin/leads", body);
        return response.data;
      } catch (error: any) {
        const data = error.response?.data;
        let errorMessage = "Failed to send message";
        
        if (typeof data?.error === "string") {
          errorMessage = data.error;
        } else if (data?.error?.message) {
          errorMessage = data.error.message;
        } else if (data?.message) {
          errorMessage = data.message;
        } else if (typeof data?.error === "object") {
          try {
            errorMessage = JSON.stringify(data.error);
          } catch {
            errorMessage = "An error occurred while submitting the form";
          }
        }
        
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      // Invalidate leads query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

// Hook to fetch all leads (used by LeadsTable component)
export function useLeadsQuery() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      try {
        const response = await localApi().get("/api/admin/leads");
        const data = response.data;
        
        // Transform database fields to match your Lead type
        return {
          success: data.success,
          data: data.data.map((lead: any) => ({
            id: lead.Id.toString(),
            fullName: lead.FullName,
            email: lead.EmailAddress,
            phone: lead.PhoneNumber,
            business: lead.BusinessName || "",
            source: lead.WhereDidYouHearAboutUs,
            message: lead.Message,
            datetime: lead.EnquiryDateTime,
          }))
        };
      } catch (error) {
        throw new Error("Failed to fetch leads");
      }
    },
    staleTime: 30000, // Data stays fresh for 30 seconds
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });
}

// Alias for backward compatibility
export const useLeads = useLeadsQuery;
