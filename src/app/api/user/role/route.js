import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { collections, dbConnect } from "@/lib/dbConnect";
import { authOptions } from "@/lib/authOptions";


export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ role: null });
    }

    const userCollection = dbConnect(collections.USER);

    const user = await userCollection.findOne(
      { email: session.user.email },
      { projection: { role: 1 } }
    );

    return NextResponse.json({ role: user?.role || "user" });
  } catch (error) {
    console.error("Role API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch user role" },
      { status: 500 }
    );
  }
}