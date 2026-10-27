"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import GoogleButton from "@/components/buttons/GoogleButton";

import {
  FaArrowRight,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const callBack = params.get("callbackUrl") || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.ok && !result.error) {
        Swal.fire({
          icon: "success",
          title: "লগইন সফল হয়েছে!",
          timer: 1500,
          showConfirmButton: false,
        });
        router.refresh();
        router.push(callBack);
      } else {
        setError(result?.error || "ইমেল অথবা পাসওয়ার্ড ভুল রয়েছে।");
      }
    } catch (err) {
      console.error(err);
      setError("কোথাও কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
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
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Logo & Header */}
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
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

            <h2 className="text-3xl font-extrabold">
              স্বাগতম ফিরে, আপনার অ্যাকাউন্টে লগইন করুন
            </h2>
            <p className="text-sm text-base-content/70 mt-4">
              আপনার পরিবারের যত্ন ও সেবার আপডেট পেতে সাইন ইন করুন।
            </p>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="alert alert-error text-sm py-2 px-4 rounded-xl text-white font-medium">
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content/80 mb-2">
                  ইমেল অ্যাড্রেস
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

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content/80 mb-2">
                  পাসওয়ার্ড (Password)
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                  <FaLock />
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-6 pr-12 rounded-xl focus:border-primary focus:outline-none"
                  required
                />

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
                <Link
                  href="/forgot-password"
                  className="label-text-alt text-xs text-primary hover:underline font-medium"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary text-white w-full rounded-xl shadow-md font-bold text-base py-3"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  লগইন করুন <FaArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-xs text-base-content/50 uppercase font-medium">
            অথবা
          </div>

          {/* Google Sign In Option */}
          <GoogleButton />

          {/* Register Link */}
          <p className="text-center text-sm text-base-content/70">
            Care.xyz-এ নতুন অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/register"
              className="text-primary font-bold hover:underline"
            >
              রেজিস্ট্রেশন করুন
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column: Visual / Branding Section */}
      <div className="hidden lg:flex flex-col justify-between bg-primary/10 p-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

        <div className="absolute -right-50 top-1/8 -translate-y-1/2 w-152.5 h-152.5 pointer-events-none opacity-25 animate-[spin_40s_linear_infinite]">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-primary fill-none stroke-current stroke-[1.5]"
          >
            <path d="M100,100 m-75,0 a75,75 0 1,0 150,0 a75,75 0 1,0 -150,0 m20,0 a55,55 0 1,0 110,0 a55,55 0 1,0 -110,0 m20,0 a35,35 0 1,0 70,0 a35,35 0 1,0 -70,0 m20,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0" />
          </svg>
        </div>

        <div className="relative z-10">
          <span className="badge badge-primary font-bold px-4 py-3 text-sm tracking-widest uppercase">
            TRUSTED CAREGIVING PLATFORM
          </span>
        </div>

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

        <div className="relative z-10 flex items-center gap-3 text-sm text-base-content/70 font-semibold">
          <FaShieldAlt className="text-primary h-5 w-5" />
          <span>১০০% নিরাপদ লেনদেন ও বিশ্বস্ত সেবা নিশ্চিতকরণ।</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
