
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import { getBookings } from "@/action/server/booking";
import MyBookingsPage from "@/components/layout/MyBookingPage";

const MyBookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/my-bookings");
  }

  const result = await getBookings();

  if (!result.success) {
    return (
      <div className="max-w-6xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-error">
          বুকিং লোড করা যায়নি!
        </h2>

        <p className="text-base-content/70 mt-2">
          {result.message || "অনুগ্রহ করে পরে আবার চেষ্টা করুন।"}
        </p>
      </div>
    );
  }

  return <MyBookingsPage bookings={result.bookings} />;
};

export default MyBookings;
