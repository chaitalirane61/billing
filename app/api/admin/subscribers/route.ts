

import { NextResponse } from "next/server";
import { subscriberService } from "@/services/subscribers.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await subscriberService.subscribeEmail(body);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error("POST /api/admin/subscribers error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log("🟢 GET /api/admin/subscribers called");
    
    const subscribers = await subscriberService.getAllSubscriber();
    
    console.log("📊 Subscribers found:", subscribers.length);
    
    return NextResponse.json({ 
      success: true, 
      data: subscribers,
      count: subscribers.length 
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    console.error("❌ GET /api/admin/subscribers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}