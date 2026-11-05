import Link from "next/link";
import { FaTimesCircle, FaArrowLeft, FaRedo, FaHeadset } from "react-icons/fa";

export default function PaymentCancelPage() {
  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-base-100 relative overflow-hidden">
      
      {/* Background Glow Elements (Error/Warning tint) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-error/10 blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full bg-base-200/50 border border-base-300 rounded-xl p-8 lg:p-10 shadow-xl text-center relative z-10 backdrop-blur-sm space-y-6">
        
        {/* Cancel/Error Animated Icon */}
        <div className="relative flex items-center justify-center mx-auto">
          <div className="absolute w-24 h-24 rounded-full bg-error/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-2xl bg-error text-error-content flex items-center justify-center shadow-lg shadow-error/30 text-4xl">
            <FaTimesCircle />
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <span className="badge badge-error badge-soft font-bold px-4 py-2 text-sm tracking-wider uppercase rounded-full">
            পেমেন্ট বাতিল করা হয়েছে
          </span>
          <h1 className="text-3xl font-black tracking-tight text-base-content">
            পেমেন্ট সম্পন্ন হয়নি!
          </h1>
          <p className="text-sm text-base-content/70 leading-relaxed mt-4">
            আপনার পেমেন্ট প্রক্রিয়াটি বাতিল করা হয়েছে। কোনো টাকা কাটা হয়নি এবং নতুন কোনো বুকিং তৈরি করা হয়নি।
          </p>
        </div>

        {/* Helpful Info Box */}
        <div className="bg-base-100 rounded-xl p-4 border border-base-300/60 text-left space-y-2 text-xs text-base-content/70">
          <div className="flex items-center gap-2 px-10 font-medium">
            <span className="text-error font-bold">ℹ️</span>
            <span>কারিগরি সমস্যা বা ভুলবশত কেটে গেলে আবার চেষ্টা করতে পারেন।</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Link
            href="/services"
            className="btn btn-primary text-white w-full rounded-2xl font-bold shadow-md shadow-primary/20 gap-2 py-3.5"
          >
            <FaRedo /> আবার সার্ভিস ব্রাউজ করুন
          </Link>
          
          <Link
            href="/"
            className="btn btn-ghost w-full rounded-2xl font-semibold text-base-content/70 hover:text-base-content gap-2"
          >
            <FaArrowLeft size={12} /> হোম পেজে ফিরে যান
          </Link>
        </div>

        {/* Support Note */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-base-content/50 font-medium">
          <FaHeadset className="text-primary" />
          <span>কোনো সমস্যা হলে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।</span>
        </div>

      </div>
    </main>
  );
}