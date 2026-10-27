"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import GoogleButton from "@/components/buttons/GoogleButton";
import { postUser } from "@/action/server/auth";
import {
  FaArrowRight,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaIdCard,
  FaLock,
  FaPhone,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";

const RegisterPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const callBack = params.get("callbackUrl") || "/";

  const [formData, setFormData] = useState({
    nid: "",
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { password } = formData;

    // পাসওয়ার্ড ভ্যালিডেশন
    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("পাসওয়ার্ডে অন্তত ১টি বড় হাতের অক্ষর (Uppercase) থাকতে হবে।");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("পাসওয়ার্ডে অন্তত ১টি ছোট হাতের অক্ষর (Lowercase) থাকতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const response = await postUser(formData);

      if (response && response.success) {
        await Swal.fire({
          icon: "success",
          title: "অভিনন্দন!",
          text: "আপনার রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে।",
          confirmButtonColor: "#22c55e",
          confirmButtonText: "OK",
        });

        router.refresh();
        router.push(callBack);
      } else {
        setError(response?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      setError("কোথাও কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base-100/80 backdrop-blur-md min-h-screen">
        <div className="flex flex-col items-center space-y-6 animate-pulse">
          {/* Brand Logo or Icon Spinner */}
          <div className="relative flex items-center justify-center">
            {/* Outer Ring Animation */}
            <div className="absolute w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />

            {/* Inner Branding / Heart Icon / Care.xyz initial */}
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shadow-inner overflow-hidden p-2">
              <Image
                src="/carexyzlogo.png"
                alt="Care.xyz Logo"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold text-base-content tracking-wide">
              Care<span className="text-primary">.xyz</span>
            </h2>
            <p className="text-xs text-base-content/60 font-medium">
              আপনার নির্ভরযোগ্য কেয়ার প্ল্যাটফর্ম লোড হচ্ছে...
            </p>
          </div>

          {/* Loading Dots Bar */}
          <div className="flex gap-1.5 pt-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-base-100">
      {/* Left Column: Form Section */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="max-w-md w-full mx-auto space-y-6">
          {/* Logo & Header */}
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full bg-primary/10 p-2 shadow-inner">
                <Image
                  src="/carexyzlogo.png"
                  alt="Care.xyz Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-black text-base-content tracking-tight">
                Care<span className="text-primary">.xyz</span>
              </span>
            </Link>

            <h2 className="text-3xl font-extrabold">অ্যাকাউন্ট তৈরি করুন</h2>
            <p className="text-sm text-base-content/70 mt-4">
              আপনার পরিবারের সেবার জন্য আজই Care.xyz-এ যুক্ত হোন।
            </p>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="alert alert-error text-sm py-2 px-4 rounded-xl text-white font-medium">
              <span>{error}</span>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NID No Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content/80 mb-2">
                  এনআইডি নম্বর (NID No)
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                  <FaIdCard />
                </span>
                <input
                  type="text"
                  name="nid"
                  value={formData.nid}
                  onChange={handleChange}
                  placeholder="NID / আপনার এনআইডি নম্বর লিখুন"
                  className="input input-bordered w-full pl-6 rounded-xl focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content/80 mb-2">
                  আপনার নাম (Name)
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name / আপনার পুরো নাম"
                  className="input input-bordered w-full pl-6 rounded-xl focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content/80 mb-2">
                  ইমেল অ্যাড্রেস (Email)
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="input input-bordered w-full pl-6 rounded-xl focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Contact Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content/80 mb-2">
                  মোবাইল নম্বর (Contact)
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                  <FaPhone />
                </span>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="017XXXXXXXX"
                  className="input input-bordered w-full pl-6 rounded-xl focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content/80 mb-2">
                  পাসওয়ার্ড (Password)
                </span>
              </label>
              <div className="relative">
                {/* বাম পাশের লক আইকন */}
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                  <FaLock />
                </span>

                {/* পাসওয়ার্ড ইনপুট (dynamic type: text/password) */}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-6 pr-12 rounded-xl focus:border-primary focus:outline-none"
                  required
                />

                {/* ডান পাশের টগল আইকন বা বাটন */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/50 hover:text-primary transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>

              <label className="label">
                <span className="label-text-alt text-[11px] text-red-300">
                  * কমপক্ষে ৬ অক্ষর, ১টি বড় ও ১টি ছোট হাতের অক্ষর থাকতে হবে।
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary text-white w-full rounded-xl shadow-md font-bold text-base py-3 mt-2"
            >
              রেজিস্ট্রেশন করুন <FaArrowRight className="h-4 w-4 ml-1" />
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-xs text-base-content/50 uppercase font-medium">
            অথবা
          </div>

          {/* Google Sign In Option */}
          <GoogleButton />

          {/* Login Link */}
          <p className="text-center text-sm text-base-content/70">
            ইতিমধ্যেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/login"
              className="text-primary font-bold hover:underline"
            >
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column: Visual / Branding Section (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between bg-primary/10 p-12 relative overflow-hidden">
        {/* Decorative Blur Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

        {/* Added Decorative Rotating Spiral / Concentric Graphic on Right Side */}
        <div className="absolute -right-50 top-1/8 -translate-y-1/2 w-152.5 h-152.5 pointer-events-none opacity-25 animate-[spin_40s_linear_infinite]">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-primary fill-none stroke-current stroke-[1.5]"
          >
            <path d="M100,100 m-75,0 a75,75 0 1,0 150,0 a75,75 0 1,0 -150,0 m20,0 a55,55 0 1,0 110,0 a55,55 0 1,0 -110,0 m20,0 a35,35 0 1,0 70,0 a35,35 0 1,0 -70,0 m20,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0" />
          </svg>
        </div>

        {/* Top Tag */}
        <div className="relative z-10">
          <span className="badge badge-primary font-bold px-4 py-3 text-sm tracking-widest uppercase">
            TRUSTED CAREGIVING PLATFORM
          </span>
        </div>

        {/* Center Quote/Writings */}
        <div className="relative z-10 space-y-6 my-auto">
          <h3 className="text-3xl xl:text-4xl font-extrabold text-base-content leading-snug">
            &quot;আপনার পরিবারের প্রিয়জনদের সুরক্ষায় আমরা আছি সবসময়
            পাশে।&quot;
          </h3>
          <p className="text-base text-base-content/70">
            প্রশিক্ষিত ও এনআইডি ভেরিফাইড কেয়ারগিভার দিয়ে আপনার ঘরকে রাখুন
            নিরাপদ ও স্বাচ্ছন্দ্যময়।
          </p>
        </div>

        {/* Footer Trust Badge */}
        <div className="relative z-10 flex items-center gap-3 text-sm text-base-content/70 font-semibold">
          <FaShieldAlt className="text-primary h-5 w-5" />
          <span>১০০% নিরাপদ লেনদেন ও বিশ্বস্ত সেবা নিশ্চিতকরণ।</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
