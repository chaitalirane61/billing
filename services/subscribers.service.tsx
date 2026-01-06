

import { subscribeSchema } from "@/lib/validations";
import { SubscribeData } from "@/lib/types";
import { getConnection, sql } from "@/lib/db";

export const subscriberService = {
  // Submit new subscriber
  subscribeEmail: async (data: SubscribeData) => {
    const parsed = subscribeSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false as const,
        error: parsed.error.flatten(),
      };
    }

    try {
      const pool = await getConnection();

      await pool.request()
        .input("Email", sql.VarChar(100), parsed.data.email)
        .input("SubscribedAt", sql.DateTime, new Date())
        .query(`
          INSERT INTO kbazarSubscribe (Email, SubscribedAt)
          VALUES (@Email, @SubscribedAt)
        `);

      console.log("SUBSCRIBER SAVED:", parsed.data);

      return {
        success: true as const,
        message: "Subscriber saved successfully.",
      };
    } catch (error) {
      console.error("Database error:", error);
      return {
        success: false as const,
        error: "Failed to save subscriber to database.",
      };
    }
  },

  // Fetch all subscribers from ShopcareSubscribe table
  getAllSubscriber: async () => {
    try {
      const pool = await getConnection();

      const result = await pool.request().query(`
        SELECT 
          Id as id,
          Email as email,
          SubscribedAt as subscribedAt
        FROM kbazarSubscribe
        ORDER BY SubscribedAt DESC
      `);

      console.log("Fetched subscribers from DB:", result.recordset);
      return result.recordset;
    } catch (error) {
      console.error("Database error fetching subscribers:", error);
      throw new Error("Failed to fetch subscriber list");
    }
  },
};