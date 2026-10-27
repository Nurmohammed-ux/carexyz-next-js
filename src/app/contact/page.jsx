"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const ContactPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // সিমুলেটেড সাবমিশন (আপনি চাইলে এখানে আপনার API রাউট কানেক্ট করতে পারেন)
    setTimeout(() => {
      setSubmitting(false);
      Swal.fire({
        icon: "success",
        title: "বার্তা পাঠানো সফল হয়েছে!",
        text: "খুব শীঘ্রই আমাদের টিম আপনার সাথে যোগাযোগ করবে।",
        confirmButtonColor: "#22c55e",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-6 lg:px-8">
      <div className="space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content">
            আমাদের সাথে <span className="text-primary">যোগাযোগ করুন</span>
          </h1>
          <p className="text-base-content/70 mt-4">
            যেকোনো প্রশ্ন, মতামত কিংবা সেবার প্রয়োজনে আমাদের বার্তা পাঠান। আমরা
            সবসময় আপনার সহায়তায় প্রস্তুত।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Contact Info Cards */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-base-200/50 p-6 rounded-xl border border-base-300 space-y-4">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 bg-white text-primary rounded-2xl flex items-center justify-center shrink-0 text-lg">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="font-bold text-lg">অফিসের ঠিকানা</h3>
                  <p className="text-sm text-base-content/70 mt-1">
                    ধানমন্ডি, ঢাকা-১২০৯, বাংলাদেশ
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-base-200/50 p-6 rounded-xl border border-base-300 space-y-4">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 bg-white text-primary rounded-2xl flex items-center justify-center shrink-0 text-lg">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ফোন করুন</h3>
                  <p className="text-sm text-base-content/70 mt-1">
                    +৮৮০ ১৭০০ ১২৩ ৪৫৬
                    <br />
                    +৮৮০ ৯৬০০ ১২৩ ৪৫৬
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-base-200/50 p-6 rounded-xl border border-base-300 space-y-4">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 bg-white text-primary rounded-2xl flex items-center justify-center shrink-0 text-lg">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ইমেল করুন</h3>
                  <p className="text-sm text-base-content/70 mt-1">
                    support@care.xyz
                    <br />
                    info@care.xyz
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-2 bg-base-200/50 p-8 rounded-xl border border-base-300 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">
                আমাদের একটি বার্তা পাঠান
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="label font-semibold text-sm">
                    আপনার নাম
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="পূর্ণ নাম লিখুন"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full rounded-xl bg-base-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="label font-semibold text-sm">
                    ইমেল ঠিকানা
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full rounded-xl bg-base-100"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="label font-semibold text-sm">বিষয়</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="কী বিষয়ে যোগাযোগ করতে চান?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-xl bg-base-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="label font-semibold text-sm">
                  আপনার বার্তা
                </label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="বিস্তারিত এখানে লিখুন..."
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full rounded-xl bg-base-100"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary text-white w-full rounded-xl font-bold text-base py-3 shadow-md gap-2"
              >
                {submitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <FaPaperPlane /> বার্তা পাঠান
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
