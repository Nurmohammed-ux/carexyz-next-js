"use server";

import { requireAdmin } from "@/lib/adminAuth";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";


const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];

export async function updateBookingStatus(bookingId, status) {
  try {
    await requireAdmin();

    if (!ObjectId.isValid(bookingId)) {
      return { success: false, message: "Invalid booking ID." };
    }

    if (!allowedStatuses.includes(status)) {
      return { success: false, message: "Invalid booking status." };
    }

    const bookingCollection = dbConnect(collections.BOOKING);

    const result = await bookingCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
    );

    if (!result.matchedCount) {
      return { success: false, message: "Booking not found." };
    }

    revalidatePath("/dashboard/admin");

    return {
      success: true,
      message: `Booking status updated to ${status}.`,
    };
  } catch (error) {
    console.error("Admin booking update error:", error);

    return {
      success: false,
      message: "Unable to update booking status.",
    };
  }
}
