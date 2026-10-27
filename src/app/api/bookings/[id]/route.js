import { NextResponse } from "next/server";
import { deleteBooking } from "@/action/server/booking";

export async function DELETE(request, { params }) {
  try {
    const result = await deleteBooking(request, { params });

    return NextResponse.json(result, {
      status: result.success
        ? 200
        : result.message?.includes("Unauthorized")
          ? 401
          : 400,
    });
  } catch (error) {
    console.error("DELETE booking route error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "সার্ভারে সমস্যা হয়েছে।",
      },
      { status: 500 },
    );
  }
}
