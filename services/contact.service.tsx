import { contactSchema } from "@/lib/validations";
import { ContactFormData } from "@/lib/types";
import { getConnection, sql } from "@/lib/db";

export const contactService = {
  // Submit new contact form - saves to ShopcareEnquiry table
  submitContact: async (data: ContactFormData) => {
    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false as const,
        error: parsed.error.flatten(),
      };
    }

    try {
      const pool = await getConnection();
      
      // Insert into ShopcareEnquiry table
      await pool.request()
        .input("FullName", sql.VarChar(100), parsed.data.fullName)
        .input("EmailAddress", sql.VarChar(100), parsed.data.email)
        .input("PhoneNumber", sql.VarChar(10), parsed.data.phone)
        .input("BusinessName", sql.VarChar(sql.MAX), parsed.data.businessName || null)
        .input("Message", sql.VarChar(sql.MAX), parsed.data.message)
        .input("WhereDidYouHearAboutUs", sql.NVarChar(sql.MAX), parsed.data.heardAboutUs)
        .input("EnquiryDateTime", sql.DateTime, new Date())
        .query(`
          INSERT INTO ShopcareEnquiry 
          (FullName, EmailAddress, PhoneNumber, BusinessName, Message, WhereDidYouHearAboutUs, EnquiryDateTime)
          VALUES 
          (@FullName, @EmailAddress, @PhoneNumber, @BusinessName, @Message, @WhereDidYouHearAboutUs, @EnquiryDateTime)
        `);

      console.log("CONTACT SUBMITTED TO ShopcareEnquiry:", parsed.data);

      return {
        success: true as const,
        message: "Contact form submitted successfully.",
      };
    } catch (error) {
      console.error("Database error:", error);
      return {
        success: false as const,
        error: "Failed to save contact information to database.",
      };
    }
  },

  // Fetch all leads from ShopcareEnquiry table
  getAllLeads: async () => {
    try {
      const pool = await getConnection();
      
      // Select all data from ShopcareEnquiry table
      const result = await pool.request().query(`
        SELECT 
          Id,
          FullName,
          EmailAddress,
          PhoneNumber,
          BusinessName,
          Message,
          WhereDidYouHearAboutUs,
          EnquiryDateTime
        FROM ShopcareEnquiry
        ORDER BY EnquiryDateTime DESC
      `);

      return result.recordset;
    } catch (error) {
      console.error("Database error fetching from ShopcareEnquiry:", error);
      throw new Error("Failed to fetch leads from ShopcareEnquiry table");
    }
  },
};