import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { collections, dbConnect } from "./dbConnect";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const userCollection = dbConnect(collections.USER);

  const admin = await userCollection.findOne({
    email: session.user.email,
    role: "admin",
  });

  if (!admin) {
    redirect("/");
  }

  return admin;
}
