"use client";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaClock, FaTag, FaArrowLeft, FaShieldAlt } from "react-icons/fa";

const ServiceDetails = ({ service }) => {
  if (!service) return null;

  return (
    <div className="px-6 lg:px-8">
      {/* Back Button */}
      <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-green-600 mb-6 hover:underline">
        <FaArrowLeft className="h-3.5 w-3.5" /> সব সেবাসমূহ দেখুন
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 items-start">
        
        {/* Left Column: Image, Description & Features */}
        <div className="space-y-8">
          
          {/* Service Image Banner */}
          <div className="relative h-122.5 w-full rounded-xl overflow-hidden shadow-xl bg-base-200">
            <Image
              src={service.image}
              alt={service.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="badge badge-primary font-semibold mb-2 px-3 py-2 text-sm uppercase tracking-wider">
                {service.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold">{service.name}</h1>
            </div>
          </div>

          {/* Short & Main Description */}
          <div className="bg-base-100 p-6 sm:p-8 rounded-xl shadow-sm border border-base-200 space-y-4">
            <h3 className="text-xl font-bold text-base-content">সেবার সংক্ষিপ্ত বিবরণ</h3>
            <p className="text-base font-medium text-primary bg-primary/5 p-4 rounded-2xl border border-primary/10">
              {service.shortDescription}
            </p>
            <p className="text-base text-base-content/80 leading-relaxed pt-2">
              {service.description}
            </p>
          </div>

          {/* Features List */}
          <div className="bg-base-100 p-6 sm:p-8 rounded-xl shadow-sm border border-base-200">
            <h3 className="text-xl font-bold text-base-content mb-6">এই সেবার অন্তর্ভুক্ত বৈশিষ্ট্যসমূহ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features?.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 bg-base-200/50 p-3.5 rounded-2xl">
                  <FaCheckCircle className="text-primary shrink-0 mt-1 h-4 w-4" />
                  <span className="text-sm font-medium text-base-content/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Pricing, Availability & Sticky Booking Box */}
        <div className="space-y-6 lg:sticky lg:top-24">
          
          <div className="bg-base-100 p-6 sm:p-8 rounded-xl shadow-xl border border-base-200">
            
            {/* Price Box */}
            <div className="text-center pb-6 border-b border-base-200">
              <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">সেবার মূল্য</span>
              <div className="text-4xl sm:text-5xl font-black text-primary mt-2">
                ৳{service.startingPrice} <span className="text-sm font-semibold text-base-content/70">/ {service.priceUnit}</span>
              </div>
            </div>

            {/* Ideal For Section */}
            <div className="py-6 border-b border-base-200 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-base-content/70">যাঁদের জন্য উপযোগী:</h4>
              <div className="flex flex-wrap gap-4">
                {service.idealFor?.map((item, index) => (
                  <span key={index} className="badge badge-outline text-sm font-medium py-2.5 px-3">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability Section */}
            <div className="py-6 border-b border-base-200 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-base-content/70">প্রাপ্ত সময় / উপলব্ধতা:</h4>
              <div className="flex flex-wrap gap-4 mt-2">
                {service.availability?.map((avail, index) => (
                  <span key={index} className="badge bg-primary/10 text-primary border-none text-sm font-semibold py-2.5 px-3">
                    {avail}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust Assurance */}
            <div className="flex items-center gap-3 py-4 text-sm text-base-content/70">
              <FaShieldAlt className="text-primary h-5 w-5 shrink-0" />
              <span>১০০% ভেরিফাইড ও বিশ্বস্ত কেয়ারগিভার নিশ্চিতকরণ।</span>
            </div>

            {/* Book Now Button */}
            <Link
              href={`/book-now?service=${service.slug}`}
              className="btn btn-primary text-white w-full rounded-2xl shadow-md btn-lg mt-2 font-bold"
            >
              এখনই বুক করুন
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ServiceDetails;