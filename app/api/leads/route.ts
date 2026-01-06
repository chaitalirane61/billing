
// import { NextResponse } from "next/server";
// import { getConnection, sql } from "@/lib/db";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       name,
//       email,
//       phone,
//       business,
//       message,
//       hearAbout,
//       hearAboutOther
//     } = body;

//     const pool = await getConnection();

//     await pool
//       .request()
//       .input("Name", sql.VarChar(200), name)
//       .input("Email", sql.VarChar(200), email || "")
//       .input("Phone", sql.VarChar(20), phone)
//       .input("Business", sql.VarChar(200), business || "")
//       .input("Message", sql.VarChar(sql.MAX), message)
//       .input("HearAbout", sql.VarChar(200), hearAbout)
//       .input("HearAboutOther", sql.VarChar(200), hearAboutOther || "")
//       .query(`
//         INSERT INTO ShopcareEnquiry
//         (Name, Email, Phone, Business, Message, HearAbout, HearAboutOther, CreatedAt)
//         VALUES (@Name, @Email, @Phone, @Business, @Message, @HearAbout, @HearAboutOther, GETDATE())
//       `);

//     return NextResponse.json(
//       { success: true, message: "Enquiry saved successfully" },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("❌ Error saving enquiry:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to save enquiry" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { getConnection, sql } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      business,
      message,
      hearAbout,
      hearAboutOther
    } = body;

    // 🔥 Now getConnection NEVER returns null
    const pool = await getConnection();

    await pool
      .request()
      .input("Name", sql.VarChar(200), name)
      .input("Email", sql.VarChar(200), email || "")
      .input("Phone", sql.VarChar(20), phone)
      .input("Business", sql.VarChar(200), business || "")
      .input("Message", sql.VarChar(sql.MAX), message)
      .input("HearAbout", sql.VarChar(200), hearAbout)
      .input("HearAboutOther", sql.VarChar(200), hearAboutOther || "")
      .query(`
        INSERT INTO kbazarEnquiry
        (Name, Email, Phone, Business, Message, HearAbout, HearAboutOther, CreatedAt)
        VALUES (@Name, @Email, @Phone, @Business, @Message, @HearAbout, @HearAboutOther, GETDATE())
      `);

    return NextResponse.json(
      { success: true, message: "Enquiry saved successfully" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Error saving enquiry:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to save enquiry"
      },
      { status: 500 }
    );
  }
}

