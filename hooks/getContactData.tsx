

// "use client";

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// interface ContactBody {
//   fullName: string;
//   email: string;
//   phone: string;
//   businessName?: string;
//   heardAboutUs: string;
//   message: string;
// }

// // Hook to submit contact form
// export function useContactForm() {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: async (body: ContactBody) => {
//       const res = await fetch("/api/admin/leads", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Failed to send message");
//       }

//       return data;
//     },
//     onSuccess: () => {
//       // Invalidate leads query to refresh the list
//       queryClient.invalidateQueries({ queryKey: ["leads"] });
//     },
//   });
// }

// // Hook to fetch all leads
// export function useLeads() {
//   return useQuery({
//     queryKey: ["leads"],
//     queryFn: async () => {
//       const res = await fetch("/api/admin/leads");
      
//       if (!res.ok) {
//         throw new Error("Failed to fetch leads");
//       }
      
//       return res.json();
//     },
//   });
// }
import { NextResponse } from "next/server";
import { getConnection, sql } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      email = "",
      phone,
      businessName = "",
      heardAboutUs,
      message,
    } = body;

    // REQUIRED validation
    if (!fullName || !phone || !heardAboutUs || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const pool = await getConnection();
    if (!pool) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    await pool
      .request()
      .input("Name", sql.VarChar(200), fullName)
      .input("Email", sql.VarChar(200), email)
      .input("Phone", sql.VarChar(20), phone)
      .input("Business", sql.VarChar(200), businessName)
      .input("HearAbout", sql.VarChar(200), heardAboutUs)
      .input("Message", sql.VarChar(sql.MAX), message)
      .query(`
        INSERT INTO kbazarEnquiry
        (Name, Email, Phone, Business, HearAbout, Message, CreatedAt)
        VALUES (@Name, @Email, @Phone, @Business, @HearAbout, @Message, GETDATE())
      `);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Failed to save contact information" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT * FROM kbazarEnquiry ORDER BY CreatedAt DESC
    `);

    return NextResponse.json(result.recordset, { status: 200 });
  } catch (err) {
    console.error("GET Leads Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
