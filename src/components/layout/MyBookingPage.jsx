"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaEye,
  FaTimes,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";
import Swal from "sweetalert2";

const statusStyles = {
  pending: "badge-warning",
  confirmed: "badge-info",
  completed: "badge-success",
  cancelled: "badge-error",
};

const formatStatus = (status = "pending") =>
  status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

const formatDate = (date) => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Not available";

  return parsedDate.toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function MyBookingsPage({ bookings = [] }) {
  const [booking, setBooking] = useState(bookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const router = useRouter();

  const handleDeleteBooking = async (id) => {
    console.log(id)
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "বুকিংটি বাতিল করলে এটি আর পুনরুদ্ধার করা যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "হ্যাঁ, বাতিল করুন",
      cancelButtonText: "না",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        await Swal.fire(
          "ত্রুটি!",
          data.message || "বাতিল করা সম্ভব হয়নি।",
          "error",
        );
        return;
      }

      // Remove the booking from the table
      setBooking((prevBookings) =>
        prevBookings.filter((item) => item._id !== id),
      );

      // Close the modal if this booking was selected
      setSelectedBooking((current) => (current?._id === id ? null : current));

      router.refresh();
      await Swal.fire("বাতিল হয়েছে!", data.message, "success");
    } catch (error) {
      console.error("Cancel booking error:", error);

      await Swal.fire(
        "ত্রুটি!",
        error.message || "অজানা সমস্যা হয়েছে।",
        "error",
      );
    }
  };

  return (
    <section className="pt-16 pb-6 px-6 lg:px-8 text-center">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content">
              আমার বুকিংসমূহ (My Bookings)
            </h1>

            <p className="text-base-content/70 mt-4">
              আপনার করা সকল সেবার বুকিংয়ের বর্তমান অবস্থা ট্র্যাক করুন।
            </p>
          </div>

          <div className="bg-base-200 px-4 py-2 rounded-xl font-medium text-sm">
            মোট বুকিং:{" "}
            <span className="text-primary font-bold">{bookings.length}</span> টি
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 p-5">
            <h2 className="text-lg font-bold">Booking History</h2>
            <span className="badge badge-primary badge-outline">
              {bookings.length} Bookings
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-20 bg-base-200/50 rounded-2xl border border-base-300">
              <FaCalendarAlt className="text-4xl text-primary mx-auto mb-4" />

              <h3 className="text-xl font-bold mb-2">আপনার কোনো বুকিং নেই!</h3>

              <p className="text-base-content/60 mb-6">
                আমাদের ক্যাটালগ থেকে আপনার প্রয়োজনীয় সার্ভিসটি বুক করে নিতে
                পারেন।
              </p>

              <Link
                href="/services"
                className="btn btn-primary text-white rounded-xl"
              >
                সার্ভিসগুলো দেখুন
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full align-middle">
                <thead>
                  <tr className="bg-base-200/60 text-base-content font-bold">
                    <th className="w-12 text-center">#</th>
                    <th>সেবার নাম</th>
                    <th>সময়কাল</th>
                    <th>লোকেশন</th>
                    <th>মোট খরচ</th>
                    <th className="text-center">স্ট্যাটাস</th>
                    <th className="text-center">কার্যক্রম</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking, index) => {
                    const status = (booking.status || "pending").toLowerCase();

                    return (
                      <tr key={booking._id} className="hover">
                        <th className="font-medium text-center">{index + 1}</th>

                        <td>
                          <div>
                            <p className="font-semibold">
                              {booking.serviceName || "কেয়ার সার্ভিস"}
                            </p>
                            <p className="mt-0.5 text-xs text-base-content/50">
                              আইডি: {booking._id}
                            </p>
                          </div>
                        </td>

                        <td>
                          <div className="flex items-center gap-1.5 text-sm whitespace-nowrap">
                            <FaClock className="text-base-content/50 shrink-0" />
                            <span>
                              {booking.duration}{" "}
                              {booking.priceUnit === "hour" ? "ঘণ্টা" : "দিন"}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="text-xs space-y-0.5 max-w-xs">
                            <p className="font-semibold flex items-center gap-1 truncate">
                              <FaMapMarkerAlt className="text-primary shrink-0" />
                              <span>
                                {booking.location?.city},{" "}
                                {booking.location?.district}
                              </span>
                            </p>
                            <p className="text-base-content/60 truncate">
                              {booking.location?.address}
                            </p>
                          </div>
                        </td>

                        <td className="font-semibold text-primary whitespace-nowrap">
                          ৳
                          {Number(booking.totalCost || 0).toLocaleString(
                            "en-BD",
                          )}
                        </td>

                        <td className="text-center">
                          <span
                            className={`badge badge-sm font-medium ${
                              statusStyles[status] || "badge-ghost"
                            }`}
                          >
                            {formatStatus(status)}
                          </span>
                        </td>

                        <td>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedBooking(booking)}
                              className="btn btn-sm btn-outline btn-primary rounded-lg gap-1.5"
                            >
                              <FaEye />
                              <span>বিস্তারিত</span>
                            </button>

                            {["pending", "confirmed"].includes(status) && (
                              <button
                                type="button"
                                onClick={() => handleDeleteBooking(booking._id)}
                                className="btn btn-sm btn-outline btn-error rounded-lg gap-1.5"
                              >
                                <FaTimes />
                                <span>বাতিল</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div
            className="modal modal-open"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedBooking(null);
              }
            }}
          >
            <div className="modal-box max-w-2xl rounded-3xl p-0">
              <div className="flex items-start justify-between bg-primary p-6 text-primary-content sm:p-8">
                <div>
                  <p className="text-sm font-medium opacity-80">
                    Care.xyz · বুকিং বিবরণী
                  </p>
                  <h2
                    id="booking-modal-title"
                    className="mt-2 text-2xl font-bold"
                  >
                    {selectedBooking.serviceName || "কেয়ার সার্ভিস"}
                  </h2>
                  <p className="mt-1 break-all text-sm opacity-80">
                    বুকিং আইডি: {selectedBooking._id}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="btn btn-circle btn-sm btn-ghost"
                  aria-label="বুকিং বিবরণ বন্ধ করুন"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-5 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-semibold">বুকিংয়ের স্ট্যাটাস</span>
                  <span
                    className={`badge badge-lg ${
                      statusStyles[
                        (selectedBooking.status || "pending").toLowerCase()
                      ] || "badge-ghost"
                    }`}
                  >
                    {formatStatus(selectedBooking.status)}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-base-200/70 p-4">
                    <div className="mb-3 flex items-center gap-2 text-primary">
                      <FaClock />
                      <span className="text-sm font-medium">সময়কাল</span>
                    </div>
                    <p className="text-lg font-bold">
                      {selectedBooking.duration}{" "}
                      {selectedBooking.priceUnit === "hour" ? "ঘণ্টা" : "ইউনিট"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-base-200/70 p-4">
                    <div className="mb-3 flex items-center gap-2 text-primary">
                      <FaMoneyBillWave />
                      <span className="text-sm font-medium">মোট খরচ</span>
                    </div>
                    <p className="text-lg font-bold">
                      ৳
                      {Number(selectedBooking.totalCost || 0).toLocaleString(
                        "en-BD",
                      )}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-base-200/70 p-4 sm:col-span-2">
                    <div className="mb-3 flex items-center gap-2 text-primary">
                      <FaMapMarkerAlt />
                      <span className="text-sm font-medium">
                        সেবার ঠিকানা (লোকেশন)
                      </span>
                    </div>
                    <p className="font-semibold">
                      {[
                        selectedBooking.location?.address,
                        selectedBooking.location?.city,
                        selectedBooking.location?.district,
                        selectedBooking.location?.division,
                      ]
                        .filter(Boolean)
                        .join(", ") || "ঠিকানা প্রদান করা হয়নি"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-base-200/70 p-4 sm:col-span-2">
                    <div className="mb-3 flex items-center gap-2 text-primary">
                      <FaCalendarAlt />
                      <span className="text-sm font-medium">
                        বুকিংয়ের তারিখ
                      </span>
                    </div>
                    <p className="font-semibold">
                      {formatDate(selectedBooking.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    onClick={() => setSelectedBooking(null)}
                    className="btn btn-primary rounded-xl px-6"
                  >
                    বিবরণ বন্ধ করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
