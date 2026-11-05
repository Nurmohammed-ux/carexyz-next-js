import AdminOverview from "@/components/dashboard/admin/AdminOverview";
import { requireAdmin } from "@/lib/adminAuth";
import { collections, dbConnect } from "@/lib/dbConnect";


export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin();

  const paymentCollection = dbConnect(collections.PAYMENT);
  const bookingCollection = dbConnect(collections.BOOKING);

  const [
    totalPayments,
    paidPayments,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    payments,
    bookings,
  ] = await Promise.all([
    paymentCollection.countDocuments(),

    paymentCollection.countDocuments({
      status: "paid",
    }),

    bookingCollection.countDocuments({
      status: "pending",
    }),

    bookingCollection.countDocuments({
      status: "confirmed",
    }),

    bookingCollection.countDocuments({
      status: "completed",
    }),

    bookingCollection.countDocuments({
      status: "cancelled",
    }),

    paymentCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray(),

    bookingCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray(),
  ]);

  const revenueResult = await paymentCollection
    .aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalCost" },
        },
      },
    ])
    .toArray();

  const stats = {
    totalPayments,
    paidPayments,
    totalRevenue: revenueResult[0]?.total || 0,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
  };

  const serialize = (documents) =>
    JSON.parse(JSON.stringify(documents));

  return (
    <AdminOverview
      stats={stats}
      payments={serialize(payments)}
      bookings={serialize(bookings)}
    />
  );
}
