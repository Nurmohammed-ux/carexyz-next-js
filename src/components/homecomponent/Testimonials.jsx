"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";

// Success Metrics Data
const metrics = [
  {
    id: 1,
    label: "সন্তুষ্ট পরিবার",
    value: "৫,০০০+",
    description: "আমাদের সার্ভিসে আস্থা রেখেছেন",
  },
  {
    id: 2,
    label: "ভেরিফাইড কেয়ারগিভার",
    value: "১,২০০+",
    description: "প্রশিক্ষিত ও ব্যাকগ্রাউন্ড চেক করা",
  },
  {
    id: 3,
    label: "ঘণ্টা কেয়ার সেবা",
    value: "১,৫০,০০০+",
    description: "সফলভাবে কেয়ার প্রদান করা হয়েছে",
  },
  {
    id: 4,
    label: "গড় রেটিং",
    value: "৪.৯ / ৫",
    description: "গ্রাহকদের রিভিউ ও ফিডব্যাক",
  },
];

// 7 Testimonials Data
const testimonials = [
  {
    id: 1,
    name: "তানজিলা রহমান",
    role: "ওয়ার্কিং মাদার, ঢাকা",
    service: "বেবিসিটিং সার্ভিস",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    comment:
      "Care.xyz থেকে পাওয়া বেবিসিটার আপু আমার ১ বছরের বাচ্চার খুব সুন্দর যত্ন নেন। অফিসে থাকলেও এখন আর কোনো চিন্তা থাকে না। তাদের দায়িত্ববোধ সত্যিই প্রশংসনীয়!",
  },
  {
    id: 2,
    name: "মাহমুদুল হাসান",
    role: "ব্যবসায়ী, উত্তরা",
    service: "প্রবীণ পরিচর্যা (Elderly Care)",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    comment:
      "আমার বৃদ্ধ বাবার নিয়মিত ওষুধের যত্ন ও মানসিক সঙ্গ দেওয়ার জন্য একজন কেয়ারগিভার দরকার ছিল। এখান থেকে সার্ভিস পেয়ে আমরা অত্যন্ত সন্তুষ্ট।",
  },
  {
    id: 3,
    name: "ডাঃ ফারহানা ইয়াসমিন",
    role: "চিকিৎসক, ধানমন্ডি",
    service: "পেশেন্ট কেয়ার",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    comment:
      "সার্জারির পর আম্মার ২৪ ঘণ্টা পেশেন্ট কেয়ার সহায়তার প্রয়োজন ছিল। Care.xyz থেকে পাওয়া কেয়ারগিভার নার্সের প্রফেশনালিজম আমাকে মুগ্ধ করেছে।",
  },
  {
    id: 4,
    name: "আরিফুল ইসলাম",
    role: "সফটওয়্যার ইঞ্জিনিয়ার, গুলশান",
    service: "পার্ট-টাইম বেবিসিটিং",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    comment:
      "বুকিং প্রসেস খুবই সহজ এবং দ্রুত। হঠাৎ জরুরি প্রয়োজনেও আমি ৩ ঘণ্টার মধ্যে বিশ্বস্ত কেয়ারগিভার পেয়েছি। অসাধারণ প্ল্যাটফর্ম!",
  },
  {
    id: 5,
    name: "নাসরিন সুলতানা",
    role: "গৃহিণী, মিরপুর",
    service: "প্রবীণ পরিচর্যা",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    comment:
      "আমার শাশুড়ি আম্মার হাঁটাচলায় কষ্ট হতো। কেয়ারগিভার আসার পর তিনি আগের চেয়ে অনেক উৎফুল্ল থাকেন। তাদের ব্যবহারে এক ধরণের পারিবারিক মমতা আছে।",
  },
  {
    id: 6,
    name: "রেজাউল করিম",
    role: "ব্যাংকার, চট্টগ্রাম",
    service: "পেশেন্ট কেয়ার",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    comment:
      "নিরাপত্তা নিয়ে আমাদের একটু ভয় ছিল, কিন্তু এনআইডি ভেরিফাইড ও প্রফেশনাল ট্রেনিং নিশ্চিত করায় তাদের ওপর সম্পূর্ণ আস্থা তৈরি হয়েছে।",
  },
  {
    id: 7,
    name: "শারমিন আক্তার",
    role: "শিক্ষিকা, সিলেট",
    service: "ফুল-টাইম চাইল্ড কেয়ার",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    comment:
      "বাচ্চাকে সামলানোর পাশাপাশি ওর পড়াশোনা ও খাবারের রুটিন মেনে চলা সব কাজ খুব দক্ষতার সাথে সম্পন্ন করেন। ধন্যবাদ Care.xyz!",
  },
];

export default function TestimonialsPage() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto Slider Effect (Every 5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);

  const prevSlide = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  // ৩টি কার্ডের পজিশন ও ২ ডিগ্রি এঙ্গেল সেট করার লজিক
  const getCardStyle = (index) => {
    const total = testimonials.length;
    let diff = (index - current + total) % total;
    if (diff > total / 2) diff -= total;

    if (diff === 0) {
      // Center Main Card (সেন্টারের মূল কার্ড - একদম সামনে ও স্পষ্ট)
      return "z-30 scale-100 rotate-0 opacity-100 shadow-2xl border-primary/40 pointer-events-auto";
    } else if (diff === -1) {
      // Left Card (বাম পাশের কার্ড - ৭০% এর বেশি দৃশ্যমান রাখতে দূরত্ব কমানো হয়েছে)
      return "z-20 -rotate-2 scale-90 opacity-75 blur-[0.2px] hidden md:block -translate-x-[55%] lg:-translate-x-[85%] cursor-pointer";
    } else if (diff === 1) {
      // Right Card (ডান পাশের কার্ড - ৭০% এর বেশি দৃশ্যমান রাখতে দূরত্ব কমানো হয়েছে)
      return "z-20 rotate-2 scale-90 opacity-75 blur-[0.2px] hidden md:block translate-x-[55%] lg:translate-x-[85%] cursor-pointer";
    }
    // বাকী কার্ডগুলো লুকানো থাকবে
    return "opacity-0 scale-75 pointer-events-none hidden";
  };
  return (
    <section className="py-16 lg:py-24 bg-base-100 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-xl blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />

      <div className="px-6 lg:px-8 relative z-10">
        {/* SECTION 1: SUCCESS METRICS */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content">
              পরিসংখ্যান ও আমাদের অর্জিত সাফল্য
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-base-200/50 border border-base-200 p-8 rounded-xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-4xl sm:text-5xl font-black text-primary">
                  {metric.value}
                </h3>
                <p className="text-lg font-bold text-base-content mt-2">
                  {metric.label}
                </p>
                <p className="text-xs text-base-content/60 mt-1">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: TESTIMONIALS SLIDER */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-widest uppercase text-lg">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-base-content mt-4">
              আমাদের পরিবারগুলোর অনুভূতি ও মতামত
            </h2>
          </div>

          {/* Slider Container with 3 Visible Cards */}
          <div className="relative min-h-90 flex items-center justify-center">
            <div className="relative w-full max-w-2xl flex items-center justify-center">
              {testimonials.map((item, index) => {
                const styleClasses = getCardStyle(index);

                return (
                  <div
                    key={item.id}
                    className={`absolute w-full transition-all duration-700 ease-out transform ${styleClasses}`}
                  >
                    <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-center bg-base-100 p-6 sm:p-8 rounded-xl shadow-md border border-base-200">
                      {/* User Image & Badge */}
                      <div className="flex flex-col items-center text-center">
                        <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden border-4 border-primary/20 shadow-inner">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </div>
                        <h4 className="font-bold text-lg text-base-content mt-4">
                          {item.name}
                        </h4>
                        <p className="text-xs text-base-content/70 font-medium">
                          {item.role}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          <FaCheckCircle className="h-3 w-3" /> {item.service}
                        </span>
                      </div>

                      {/* Review Content */}
                      <div className="relative">
                        <FaQuoteLeft className="text-primary/15 h-16 w-16 absolute -top-6 -left-4 z-0" />

                        {/* Rating Stars */}
                        <div className="flex gap-1 text-amber-400 mb-3 relative z-10">
                          {[...Array(item.rating)].map((_, i) => (
                            <FaStar key={i} className="h-4 w-4" />
                          ))}
                        </div>

                        <p className="text-sm sm:text-base text-base-content/80 italic leading-relaxed relative z-10">
                          “{item.comment}”
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider Controls (Arrows) */}
            <button
              onClick={prevSlide}
              aria-label="Previous Testimonial"
              className="btn btn-circle btn-sm sm:btn-md bg-base-100 hover:bg-primary hover:text-white border border-base-300 absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-40 shadow-lg transition-colors"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Testimonial"
              className="btn btn-circle btn-sm sm:btn-md bg-base-100 hover:bg-primary hover:text-white border border-base-300 absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-40 shadow-lg transition-colors"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Slide Dots / Indicators */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-base-300 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
