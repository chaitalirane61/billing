"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { localApi } from "@/api-client/localApiClient";
import { AxiosError } from "axios";

/* ----------------------- Types ----------------------- */

export interface ContactBody {
  fullName: string;
  email?: string;
  phone: string;
  businessName?: string;
  heardAboutUs: string;
  message: string;
}

export interface LeadApiResponse {
  success: boolean;
  data: LeadFromDb[];
}

export interface LeadFromDb {
  Id: number;
  FullName: string;
  EmailAddress: string;
  PhoneNumber: string;
  BusinessName?: string;
  WhereDidYouHearAboutUs: string;
  Message: string;
  EnquiryDateTime: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  business: string;
  source: string;
  message: string;
  datetime: string;
}

/* Utility: Safely detect Axios errors */
function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error
  );
}

/* -------------------- Contact Form Hook --------------------- */

export function useContactForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: ContactBody) => {
      try {
        const response = await localApi().post("/api/admin/leads", body);
        return response.data;
      } catch (error: unknown) {
        let errorMessage = "Failed to send message";

        if (isAxiosError(error)) {
          const data = error.response?.data as Record<string, unknown> | undefined;

          if (typeof data?.error === "string") {
            errorMessage = data.error;
          } else if (
            typeof data?.error === "object" &&
            data?.error !== null &&
            "message" in data.error
          ) {
            errorMessage = String((data.error as { message?: string }).message);
          } else if (typeof data?.message === "string") {
            errorMessage = data.message;
          } else if (typeof data?.error === "object") {
            try {
              errorMessage = JSON.stringify(data.error);
            } catch {
              errorMessage = "An error occurred while submitting the form";
            }
          }
        }

        throw new Error(errorMessage);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

/* -------------------- Fetch Leads Hook --------------------- */

export function useLeadsQuery() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      try {
        const response = await localApi().get("/api/admin/leads");
        const data = response.data as LeadApiResponse;

        const leads: Lead[] = data.data.map((lead) => ({
          id: String(lead.Id),
          fullName: lead.FullName,
          email: lead.EmailAddress,
          phone: lead.PhoneNumber,
          business: lead.BusinessName || "",
          source: lead.WhereDidYouHearAboutUs,
          message: lead.Message,
          datetime: lead.EnquiryDateTime,
        }));

        return { success: data.success, data: leads };
      } catch {
        throw new Error("Failed to fetch leads");
      }
    },

    staleTime: 30000,
    refetchOnWindowFocus: true,
  });
}

export const useLeads = useLeadsQuery;
