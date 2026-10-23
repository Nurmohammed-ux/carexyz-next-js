"use client";

import Image from "next/image";
import Link from "next/link";
import { BiSolidEditLocation } from "react-icons/bi";
import {
  FaHeart,
  FaShieldAlt,
  FaUserCheck,
  FaHandHoldingHeart,
  FaArrowRight,
} from "react-icons/fa";

const values = [
  {
    icon: FaShieldAlt,
    title: "নিরাপত্তা ও বিশ্বাস (Safety & Trust)",
    description:
      "আমাদের প্রতিটি কেয়ারগিভার কঠোর ব্যাকগ্রাউন্ড চেক ও জাতীয় পরিচয়পত্র যাচাইকরণের মাধ্যমে যুক্ত হন।",
  },
  {
    icon: FaHandHoldingHeart,
    title: "সহজ বুকিং (Seamless Booking)",
    description:
      "আপনার সুবিধাজনক সময় ও অবস্থান অনুযায়ী কয়েক ক্লিকের মাধ্যমেই নির্ভরযোগ্য সেবা বুক করতে পারবেন।",
  },
  {
    icon: FaUserCheck,
    title: "অভিজ্ঞ ও প্রশিক্ষিত (Expert Staff)",
    description:
      "শিশুর মানসিক বিকাশ বা প্রবীণদের বিশেষ স্বাস্থ্যসেবা—সবকিছুর জন্য আমাদের রয়েছে প্রশিক্ষিত কেয়ারগিভার।",
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 md:py-25 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="relative">
            <div className="relative h-120 lg:h-180 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/caregiver.jpg"
                alt="Caregiver supporting an elderly person with compassion"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating Mission Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-base-100 p-6 rounded-xl shadow-xl border border-base-300 max-w-xs">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                  <FaHeart className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base-content text-sm">
                    আমাদের মূল উদ্দেশ্য
                  </h4>
                  <p className="text-xs text-base-content/70 mt-0.5">
                    প্রতিটি ঘরে বিশ্বস্ত ও ভালোবাসাময় সেবা পৌঁছে দেওয়া।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Mission */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-base-content leading-tight">
              আপনার স্বজনদের সুরক্ষায় <br />
              <span className="text-primary">একটি দায়িত্বশীল প্রয়াস</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-base-content/80 leading-relaxed">
              <strong>Care.xyz (Care.IO)</strong>-এর মূল লক্ষ্য হলো কেয়ারগিভিং
              সেবাকে সবার জন্য সহজ, নিরাপদ এবং অ্যাক্সেসেবল করা। ব্যস্ততার এই
              যুগে শিশু, বৃদ্ধ কিংবা অসুস্থ প্রিয়জনের জন্য সঠিক কেয়ারগিভার খুঁজে
              পাওয়া একটি বড় চ্যালেঞ্জ।
            </p>

            <p className="mt-4 text-base text-base-content/70 leading-relaxed">
              আমরা এমন একটি বিশ্বস্ত ডিজিটাল প্ল্যাটফর্ম তৈরি করেছি যেখানে আপনি
              আপনার প্রয়োজনীয় স্থান ও সময় অনুযায়ী কোনো ধরনের ঝামেলা ছাড়াই
              পরীক্ষিত বেবিসিটার ও নার্সিং সেবা নির্বাচন করতে পারেন।
            </p>

            {/* Values List */}
            <div className="mt-8 space-y-4">
              {values.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 p-3 rounded-xl hover:bg-base-100 transition-colors"
                >
                  <div className="mt-1 h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base-content text-sm sm:text-base">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-base-content/70 mt-0.5">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Link */}
            <div className="mt-8 pt-4">
              <Link
                href={"/"}
                className="group btn min-h-13 rounded-full border-none bg-[#65B493] px-5 text-sm font-bold text-[#123D2D] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#A5DCC8] hover:shadow-xl sm:px-7 sm:text-base"
              >
                <BiSolidEditLocation className="text-lg" />
                আমাদের সম্পর্কে আরও জানুন
                <span className="ml-1 flex h-7 w-7 slides-center justify-center rounded-full bg-white/25 transition-transform duration-300 group-hover:translate-x-1">
                  <FaArrowRight className="text-xs mt-2" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
