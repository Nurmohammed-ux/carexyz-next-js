"use client";

import { useMemo, useState, useTransition } from "react";
import { updateBookingStatus } from "@/action/server/admin";
import Swal from "sweetalert2";
import {
  FaCreditCard,
  FaCheckCircle,
  FaMoneyBillWave,
  FaHourglassHalf,
  FaCalendarCheck,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaUserCheck,
  FaReceipt,
} from "react-icons/fa";

const statusStyles = {
  pending: "badge-warning text-warning-content",
  confirmed: "badge-info text-info-content",
  completed: "badge-success text-success-content",
  cancelled: "badge-error text-error-content",
};

const bookingStatuses = ["pending", "confirmed", "completed", "cancelled"];

export default function AdminOverview({ stats, payments = [], bookings = [] }) {
  const [activeTab, setActiveTab] = useState("payments");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch = [
        payment.userName,
        payment.userEmail,
        payment.serviceName,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter = filter === "all" || payment.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [payments, search, filter]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch = [
        booking.userName,
        booking.userEmail,
        booking.serviceName,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter = filter === "all" || booking.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [bookings, search, filter]);

  const handleStatusUpdate = (bookingId, status) => {
    startTransition(async () => {
      const result = await updateBookingStatus(bookingId, status);

      if (result?.success) {
        await Swal.fire({
          icon: "success",
          title: "Updated!",
          text: result.message || "Booking status updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error", result?.message || "Failed to update status", "error");
      }
    });
  };

  const money = (amount) => `৳${Number(amount || 0).toLocaleString("en-BD")}`;

  const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }) : "—";

  return (
    <div className="min-h-screen bg-base-100/60 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-base-content tracking-tight">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-base text-base-content/70 mt-4">
            Monitor real-time transactions, manage customer bookings, and track platform metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold bg-primary/10 text-primary px-3.5 py-2 rounded-xl self-start sm:self-auto">
          <FaUserCheck /> Admin Access Granted
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Total Payments</p>
              <h3 className="text-3xl font-black text-base-content mt-1">{stats?.totalPayments || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">
              <FaCreditCard />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Paid Transactions</p>
              <h3 className="text-3xl font-black text-success mt-1">{stats?.paidPayments || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-success/10 text-success flex items-center justify-center text-xl shrink-0">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-3xl font-black text-primary mt-1">{money(stats?.totalRevenue)}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">
              <FaMoneyBillWave />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Pending Bookings</p>
              <h3 className="text-3xl font-black text-warning mt-1">{stats?.pendingBookings || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-warning/10 text-warning flex items-center justify-center text-xl shrink-0">
              <FaHourglassHalf />
            </div>
          </div>
        </div>
      </div>

      {/* Booking Status Overview Summary */}
      <div className="bg-base-200/50 border border-base-300/70 rounded-2xl p-5">
        <h4 className="text-xs font-bold text-base-content/60 uppercase tracking-wider mb-3">Booking Status Breakdown</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-base-100 p-4 rounded-xl border border-base-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-base-content/60 font-medium">Pending</p>
              <p className="text-2xl font-bold text-warning">{stats?.pendingBookings || 0}</p>
            </div>
            <FaHourglassHalf className="text-warning/40 text-xl" />
          </div>

          <div className="bg-base-100 p-4 rounded-xl border border-base-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-base-content/60 font-medium">Confirmed</p>
              <p className="text-2xl font-bold text-info">{stats?.confirmedBookings || 0}</p>
            </div>
            <FaCalendarCheck className="text-info/40 text-xl" />
          </div>

          <div className="bg-base-100 p-4 rounded-xl border border-base-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-base-content/60 font-medium">Completed</p>
              <p className="text-2xl font-bold text-success">{stats?.completedBookings || 0}</p>
            </div>
            <FaCheckCircle className="text-success/40 text-xl" />
          </div>

          <div className="bg-base-100 p-4 rounded-xl border border-base-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-base-content/60 font-medium">Cancelled</p>
              <p className="text-2xl font-bold text-error">{stats?.cancelledBookings || 0}</p>
            </div>
            <FaTimesCircle className="text-error/40 text-xl" />
          </div>
        </div>
      </div>

      {/* Control Bar: Tabs & Search/Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Navigation Tabs */}
          <div className="flex p-1 bg-base-200 rounded-2xl border border-base-300 w-full sm:w-auto">
            <button
              className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "payments"
                  ? "bg-primary text-white shadow-md"
                  : "text-base-content/70 hover:text-base-content"
              }`}
              onClick={() => {
                setActiveTab("payments");
                setFilter("all");
              }}
            >
              Payment History
            </button>

            <button
              className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "bookings"
                  ? "bg-primary text-white shadow-md"
                  : "text-base-content/70 hover:text-base-content"
              }`}
              onClick={() => {
                setActiveTab("bookings");
                setFilter("all");
              }}
            >
              Manage Bookings
            </button>
          </div>

          {/* Search Input and Filter Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 text-sm" />
              <input
                type="text"
                placeholder="Search customer or service..."
                className="input input-bordered w-full pl-10 rounded-xl text-sm focus:border-primary focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative w-full sm:w-48">
              <FaFilter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 text-xs" />
              <select
                className="select select-bordered w-full pl-9 rounded-xl text-sm focus:border-primary focus:outline-none"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                {activeTab === "payments" ? (
                  <>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </>
                ) : (
                  bookingStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
          {/* Payment History View */}
          {activeTab === "payments" && (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-base-200/60 text-xs font-bold text-base-content/70 uppercase">
                  <tr>
                    <th className="py-4">Customer</th>
                    <th className="py-4">Service</th>
                    <th className="py-4">Amount</th>
                    <th className="py-4">Payment Status</th>
                    <th className="py-4">Invoice</th>
                    <th className="py-4">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-base-200 text-sm">
                  {filteredPayments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-base-200/30 transition-colors">
                      <td className="py-4">
                        <div className="font-bold text-base-content">{payment.userName || "N/A"}</div>
                        <div className="text-xs text-base-content/60">{payment.userEmail}</div>
                      </td>

                      <td className="py-4 font-semibold text-base-content/80">{payment.serviceName}</td>
                      <td className="py-4 font-bold text-primary">{money(payment.totalCost)}</td>

                      <td className="py-4">
                        <span
                          className={`badge rounded-full px-3 py-1 font-semibold text-xs ${
                            payment.status === "paid"
                              ? "badge-success text-success-content"
                              : payment.status === "pending"
                              ? "badge-warning text-warning-content"
                              : "badge-error text-error-content"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className="py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-base-content/70 font-medium">
                          <FaReceipt className="text-base-content/40" />
                          {payment.invoiceStatus || "—"}
                        </span>
                      </td>

                      <td className="py-4 text-xs text-base-content/60 font-medium">{formatDate(payment.createdAt)}</td>
                    </tr>
                  ))}

                  {filteredPayments.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-base-content/60">
                        No payment records found matching your query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Booking Management View */}
          {activeTab === "bookings" && (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-base-200/60 text-xs font-bold text-base-content/70 uppercase">
                  <tr>
                    <th className="py-4">Customer</th>
                    <th className="py-4">Service</th>
                    <th className="py-4">Amount</th>
                    <th className="py-4">Payment</th>
                    <th className="py-4">Current Status</th>
                    <th className="py-4">Update Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-base-200 text-sm">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-base-200/30 transition-colors">
                      <td className="py-4">
                        <div className="font-bold text-base-content">{booking.userName || "N/A"}</div>
                        <div className="text-xs text-base-content/60">{booking.userEmail}</div>
                      </td>

                      <td className="py-4 font-semibold text-base-content/80">{booking.serviceName}</td>
                      <td className="py-4 font-bold text-base-content">{money(booking.totalCost)}</td>

                      <td className="py-4">
                        <span className="badge badge-success rounded-full px-3 py-1 font-semibold text-xs">
                          {booking.paymentStatus || "Paid"}
                        </span>
                      </td>

                      <td className="py-4">
                        <span
                          className={`badge rounded-full px-3 py-1 font-semibold text-xs ${
                            statusStyles[booking.status] || "badge-ghost"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td className="py-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {bookingStatuses.map((status) => {
                            const isCurrent = booking.status === status;
                            return (
                              <button
                                key={status}
                                disabled={isPending || isCurrent}
                                onClick={() => handleStatusUpdate(booking._id, status)}
                                className={`btn btn-xs rounded-lg capitalize font-medium ${
                                  isCurrent
                                    ? "btn-primary text-white cursor-default"
                                    : "btn-ghost border border-base-300 hover:border-primary hover:text-primary"
                                }`}
                              >
                                {status}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-base-content/60">
                        No booking records found matching your query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}