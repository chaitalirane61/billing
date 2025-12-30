// types/leads.ts

export interface Lead {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  business: string;
  source: string;
  message: string;
  datetime: string;
}