
import { NextResponse } from "next/server";
import { subscriberService } from "@/services/subscribers.service";

export async function POST(req: Request) {
  try {
    console.log("🔵 /api/subscribe POST called");
    
    const body = await req.json();
    console.log("📧 Email received:", body.email);
    
    const result = await subscriberService.subscribeEmail(body);
    console.log("✅ Subscribe result:", result);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error("❌ /api/subscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}