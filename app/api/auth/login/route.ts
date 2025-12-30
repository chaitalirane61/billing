import { NextRequest, NextResponse } from "next/server";
import { getConnection, sql } from "@/lib/db";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";
 
export const dynamic = 'force-dynamic';
 
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
 
    // Validation
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Username and password are required",
        },
        { status: 400 }
      );
    }
 
    const pool = await getConnection();
 
    // Find user by username from UserLogin table
    const result = await pool
      .request()
      .input("username", sql.NVarChar, username).query(`
                SELECT UserId, UserName, Password, UserFullName, UserEmail,
                       Mobile, UserRoleID, IsEnabled
                FROM UserLogin
                WHERE UserName = @username
            `);
 
    if (result.recordset.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid username or password",
        },
        { status: 401 }
      );
    }
 
    const user = result.recordset[0];
 
    // Check if user is active
    if (!user.IsEnabled) {
      return NextResponse.json(
        {
          success: false,
          error: "Account is disabled. Please contact administrator.",
        },
        { status: 403 }
      );
    }
 
    // Verify password (comparing plain text password from database)
    const isPasswordValid = password === user.Password;
 
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid username or password",
        },
        { status: 401 }
      );
    }
 
    // Update last login time
    await pool.request().input("userId", sql.Int, user.UserId).query(`
                UPDATE UserLogin
                SET UpdatedOn = GETDATE()
                WHERE UserId = @userId
            `);
 
    // Generate JWT token
    const token = generateToken({
      userId: user.UserId,
      username: user.UserName,
      email: user.UserEmail,
      role: user.UserRoleID?.toString() || "user",
    });
 
    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user.UserId,
          username: user.UserName,
          email: user.UserEmail,
          fullName: user.UserFullName,
          role: user.UserRoleID,
          mobile: user.Mobile,
        },
        message: "Login successful",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}