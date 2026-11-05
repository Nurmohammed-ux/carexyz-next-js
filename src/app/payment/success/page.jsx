import Link from "next/link";
import { FaCheckCircle, FaCalendarAlt, FaArrowRight, FaShieldAlt } from "react-icons/fa";

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-base-100 relative overflow-hidden">
      
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-success/10 blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full bg-base-200/50 border border-base-300 rounded-xl p-8 lg:p-10 shadow-xl text-center relative z-10 backdrop-blur-sm space-y-6">
        
        {/* Success Animated Icon */}
        <div className="relative flex items-center justify-center mx-auto">
          <div className="absolute w-24 h-24 rounded-full bg-success/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-2xl bg-success text-success-content flex items-center justify-center shadow-lg shadow-success/30 text-4xl">
            <FaCheckCircle />
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <span className="badge badge-success badge-soft font-bold px-4 py-2 text-sm tracking-wider uppercase rounded-full">
            পেমেন্ট সফল হয়েছে
          </span>
          <h1 className="text-3xl font-black tracking-tight text-base-content">
            বুকিং নিশ্চিতকরণ প্রক্রিয়াধীন!
          </h1>
          <p className="text-sm text-base-content/70 leading-relaxed mt-4">
            ধন্যবাদ! আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। আমরা আপনার বুকিংটি প্রসেস করছি, যা খুব শীঘ্রই আপনার ড্যাশবোর্ডে দেখতে পাবেন।
          </p>
        </div>

        {/* Information Box */}
        <div className="bg-base-100 rounded-xl p-4 border border-base-300/60 text-left space-y-3 text-xs text-base-content/70">
          <div className="flex items-center gap-2.5 font-medium">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">✓</span>
            <span>লেনদেন আইডি যাচাই করা হয়েছে।</span>
          </div>
          <div className="flex items-center gap-2.5 font-medium">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">✓</span>
            <span>কেয়ারগিভারের সাথে শিডিউল সমন্বয় করা হচ্ছে।</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Link
            href="/my-bookings"
            className="btn btn-primary text-white w-full rounded-2xl font-bold shadow-md shadow-primary/20 gap-2 py-3.5"
          >
            <FaCalendarAlt /> আমার বুকিংগুলো দেখুন <FaArrowRight size={12} />
          </Link>
          
          <Link
            href="/"
            className="btn btn-ghost w-full rounded-2xl font-semibold text-base-content/70 hover:text-base-content"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>

        {/* Security Badge */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-base-content/50 font-medium">
          <FaShieldAlt className="text-success" />
          <span>১০০% নিরাপদ ও এনক্রিপ্টেড পেমেন্ট গেটওয়ে</span>
        </div>

      </div>
    </main>
  );
}