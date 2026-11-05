import Link from "next/link";
import { Suspense } from "react";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export const metadata = {
  title: "Page Not Found | Care.xyz",
  description:
    "The page you're looking for could not be found. Return to Care.xyz to explore trusted caregiving services in Bangladesh.",
  robots: {
    index: false,
    follow: true,
  },
};

function NotFoundContent() {
  return (
    <div className="text-center space-y-6 max-w-lg mx-auto">
      <div className="w-32 h-32 bg-error/10 text-error rounded-3xl flex items-center justify-center mx-auto text-5xl shadow-sm border border-error/20">
        <FaExclamationTriangle />
      </div>

      <div className="space-y-3">
        <h1 className="text-8xl font-extrabold text-primary tracking-wider">
          404
        </h1>

        <h2 className="text-3xl font-bold">পেজটি পাওয়া যায়নি!</h2>

        <p className="text-base-content/70 text-base leading-relaxed">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে, অথবা লিংকটি সঠিক নয়।
        </p>
      </div>

      <div className="pt-4">
        <Link
          href="/"
          className="btn btn-primary text-white rounded-xl font-bold px-8 shadow-md gap-2 w-full sm:w-auto inline-flex items-center justify-center"
        >
          <FaHome /> হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-base-100">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        }
      >
        <NotFoundContent />
      </Suspense>
    </main>
  );
}