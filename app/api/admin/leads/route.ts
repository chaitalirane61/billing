
import { NextResponse } from "next/server";
import { contactService } from "@/services/contact.service";
import { ContactFormData } from "@/lib/types";

// POST - Submit new contact/lead
export async function POST(req: Request) {
  try {
    const body: ContactFormData = await req.json();
    const result = await contactService.submitContact(body);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error("POST /api/admin/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Fetch all leads from ShopcareEnquiry table
export async function GET() {
  try {
    const leads = await contactService.getAllLeads();
    
    return NextResponse.json({ 
      success: true, 
      data: leads,
      count: leads.length 
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    console.error("GET /api/admin/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads from kbazarEnquiry table" },
      { status: 500 }
    );
  }
}