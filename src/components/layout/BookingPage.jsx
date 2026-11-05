"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import { createCheckoutSession } from "@/action/server/payment";


const BookingPage = ({ service }) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [duration, setDuration] = useState(1);

  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    address: "",
  });

  // Calculate total cost for display only.
  // The server calculates the actual payment amount.
  const unitPrice = Number(service.startingPrice);

  const totalCost =
    Number.isFinite(unitPrice) && unitPrice > 0 ? duration * unitPrice : 0;

  // Handle location input changes
  const handleLocationChange = (e) => {
    const { name, value } = e.target;

    setLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Start Stripe Checkout
  const handleConfirmBooking = async (e) => {
    e.preventDefault();

    if (sessionStatus === "loading") return;

    if (!session?.user?.email) {
      await Swal.fire({
        icon: "warning",
        title: "লগইন প্রয়োজন",
        text: "পেমেন্ট করতে হলে আপনাকে প্রথমে লগইন করতে হবে।",
        confirmButtonColor: "#65B493",
      });

      router.push("/login");
      return;
    }

    if (!Number.isInteger(duration) || duration < 1 || duration > 30) {
      await Swal.fire(
        "সঠিক সময় নির্বাচন করুন",
        "সময়কাল ১ থেকে ৩০-এর মধ্যে হতে হবে।",
        "warning",
      );

      return;
    }

    if (
      !location.division.trim() ||
      !location.district.trim() ||
      !location.city.trim() ||
      !location.address.trim()
    ) {
      await Swal.fire(
        "ঠিকানা প্রয়োজন",
        "অনুগ্রহ করে আপনার সম্পূর্ণ ঠিকানা প্রদান করুন।",
        "warning",
      );

      return;
    }

    setSubmitting(true);

    try {
      // Do not send userEmail, userName or totalCost.
      // The Server Action gets the user from the session
      // and calculates the amount from MongoDB.
      const result = await createCheckoutSession({
        serviceId: service._id,
        duration,
        location,
      });

      if (!result?.success) {
        await Swal.fire({
          icon: "error",
          title: "পেমেন্ট শুরু করা যায়নি!",
          text: result?.message || "আবার চেষ্টা করুন।",
          confirmButtonColor: "#65B493",
        });

        return;
      }

      // Redirect to Stripe-hosted Checkout.
      window.location.assign(result.url);
    } catch (error) {
      console.error("Payment initialization error:", error);

      await Swal.fire({
        icon: "error",
        title: "সার্ভারে সমস্যা হয়েছে!",
        text: "পেমেন্ট শুরু করা যায়নি। আবার চেষ্টা করুন।",
        confirmButtonColor: "#65B493",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-16 pb-16 lg:pb-40 px-6 lg:px-8 text-center">
      {/* Page heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content">
          সার্ভিস বুকিং কনফার্ম করুন
        </h1>

        <p className="text-base-content/70 mt-4">
          আপনার প্রয়োজনীয় সময় ও ঠিকানা প্রদান করে সেবাটি নিশ্চিত করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Booking form */}
        <form
          onSubmit={handleConfirmBooking}
          className="md:col-span-2 space-y-6 bg-base-200/50 p-8 rounded-xl shadow-sm border border-base-300"
        >
          {/* Step 1: Duration */}
          <div>
            <label
              htmlFor="duration"
              className="label font-semibold flex items-center gap-2"
            >
              <FaClock className="text-primary" />
              সময় বা মেয়াদ নির্বাচন করুন (
              {service.priceUnit === "hour" ? "ঘণ্টা" : "দিন"})
            </label>

            <input
              id="duration"
              type="number"
              min="1"
              max="30"
              step="1"
              value={duration}
              onChange={(e) => {
                const value = e.target.value;

                if (value === "") {
                  setDuration("");
                  return;
                }

                const number = Number(value);

                if (Number.isInteger(number) && number >= 1 && number <= 30) {
                  setDuration(number);
                }
              }}
              onBlur={() => {
                if (
                  !Number.isInteger(duration) ||
                  duration < 1 ||
                  duration > 30
                ) {
                  setDuration(1);
                }
              }}
              className="input input-bordered w-full rounded-xl"
              required
            />
          </div>

          {/* Step 2: Location */}
          <div className="space-y-4">
            <label className="label font-semibold flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              লোকেশন ও ঠিকানা
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="division"
                placeholder="বিভাগ (যেমন: ঢাকা)"
                value={location.division}
                onChange={handleLocationChange}
                className="input input-bordered w-full rounded-xl"
                required
              />

              <input
                type="text"
                name="district"
                placeholder="জেলা (যেমন: ঢাকা)"
                value={location.district}
                onChange={handleLocationChange}
                className="input input-bordered w-full rounded-xl"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="সিটি / থানা"
                value={location.city}
                onChange={handleLocationChange}
                className="input input-bordered w-full rounded-xl"
                required
              />

              <input
                type="text"
                name="address"
                placeholder="বিস্তারিত বাসা/রোড নম্বর"
                value={location.address}
                onChange={handleLocationChange}
                className="input input-bordered w-full rounded-xl"
                required
              />
            </div>
          </div>

          {/* Step 3: Submit */}
          <button
            type="submit"
            disabled={submitting || sessionStatus === "loading"}
            className="btn btn-primary text-white w-full rounded-xl font-bold text-base py-3 shadow-md"
          >
            {submitting ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                <FaCheckCircle />
                পেমেন্ট করুন
              </>
            )}
          </button>
        </form>

        {/* Booking summary */}
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl h-fit space-y-4">
          <h3 className="text-xl font-bold border-b border-primary/30 pb-3">
            সারসংক্ষেপ (Summary)
          </h3>

          <div>
            <p className="text-sm text-base-content/70">সেবার নাম:</p>
            <p className="font-semibold text-lg">{service.name}</p>
          </div>

          <div>
            <p className="text-sm text-base-content/70">রেট:</p>
            <p className="font-medium">
              ৳
              <span className="text-green-800 font-bold">
                {unitPrice.toLocaleString("en-BD")}
              </span>
              {" / "}
              {service.priceUnit === "hour" ? "ঘণ্টা" : "দিন"}
            </p>
          </div>

          <div>
            <p className="text-sm text-base-content/70">সময়কাল:</p>
            <p className="font-medium">
              {duration || 0} {service.priceUnit === "hour" ? "ঘণ্টা" : "দিন"}
            </p>
          </div>

          <div className="divider my-1" />

          <div className="flex justify-between items-center gap-3">
            <span className="font-bold text-lg">মোট খরচ:</span>

            <span className="text-2xl font-black text-primary">
              ৳{totalCost.toLocaleString("en-BD")}
            </span>
          </div>

          <p className="text-base text-red-700 text-center pt-2">
            * পেমেন্ট সফলভাবে সম্পন্ন হলে আপনার বুকিং তৈরি হবে। এরপর ইমেইলে
            ইনভয়েস পাঠানো হবে।
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
