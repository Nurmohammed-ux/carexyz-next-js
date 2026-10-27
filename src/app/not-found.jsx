import Link from "next/link";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-base-100">
      <div className="text-center space-y-6">
        {/* Error Icon / Illustration */}
        <div className="w-34 h-34 bg-error/10 text-error rounded-3xl flex items-center justify-center mx-auto text-6xl shadow-sm border border-error/20">
          <FaExclamationTriangle />
        </div>

        {/* 404 Code & Heading */}
        <div className="space-y-4">
          <h1 className="text-7xl font-bold text-primary tracking-wider">
            404
          </h1>
          <h2 className="text-2xl font-bold">পেজটি পাওয়া যায়নি!</h2>
          <p className="text-base-content/70 text-base leading-relaxed">
            দুঃখিত, আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে, অথবা লিংকটি
            সঠিক নয়।
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            href="/"
            className="btn btn-primary text-white rounded-xl font-bold px-8 py-3 shadow-md gap-2 w-full sm:w-auto"
          >
            <FaHome /> হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
