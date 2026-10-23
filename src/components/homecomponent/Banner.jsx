"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BiSolidEditLocation } from "react-icons/bi";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const slides = [
  {
    id: 1,
    title: "আপনার প্রিয়জনের জন্য সর্বোচ্চ নির্ভরযোগ্য সেবা",
    subtitle: "ঘরে বসেই প্রবীণ ও বিশেষ রোগীদের অভিজ্ঞ পরিচর্যা",
    description:
      "বয়স্ক এবং অসুস্থ স্বজনদের হাসিমুখ বজায় রাখতে আমরা দিচ্ছি প্রশিক্ষিত ও বিশ্বস্ত কেয়ারগিভার সার্ভিস।",
    bgImage:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1600&auto=format&fit=crop", // Elderly care image
    primaryBtnText: "কেয়ারগিভার খুঁজুন",
    primaryBtnLink: "/caregivers",
  },
  {
    id: 2,
    title: "আপনার শিশুর নিরাপদ ও ভালোবাসাময় যত্ন",
    subtitle: "বিশ্বস্ত ও ভালোবাসাপূর্ণ বেবিসিটিং সেবা",
    description:
      "আপনার কর্মব্যস্ত সময়ে সন্তানের যত্ন ও সুরক্ষায় রয়েছে আমাদের অভিজ্ঞ এবং মমতাময়ী বেবিসিটারগণ।",
    bgImage:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1600&auto=format&fit=crop", // Child care image
    primaryBtnText: "বেবিসিটার বুক করুন",
    primaryBtnLink: "/services/babysitting",
  },
  {
    id: 3,
    title: "মমতা ও ভালোবাসায় সাজানো কেয়ারগিভিং সার্ভিস",
    subtitle: "মমতাময় সহায়তা, নির্ভরযোগ্য সেবা",
    description:
      "সহজেই বুক করুন আপনার প্রয়োজন অনুযায়ী পার্ট-টাইম বা ফুল-টাইম কেয়ার সার্ভিস।",
    bgImage:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1600&auto=format&fit=crop", // Nursing/Compassion care image
    primaryBtnText: "সব সেবাসমূহ দেখুন",
    primaryBtnLink: "/services",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // অটোমেটিক স্লাইড চেঞ্জ হওয়ার জন্য (Auto-play 5 Seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-157.5 md:h-150 overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with Dark Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Green-tinted cinematic overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-[#102F26]/95 via-[#163D31]/55 to-[#163D31]/20" />
          <div className="absolute inset-0 bg-linear-to-t from-[#102F26]/35 via-transparent to-[#102F26]/15" />

          {/* Banner Content */}
          <div className="relative h-full px-20 md:px-30 flex flex-col justify-center text-white">
            <span className="text-secondary font-semibold tracking-widest uppercase mb-2 text-sm md:text-base">
              {slide.subtitle}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mb-4">
              {slide.title}
            </h1>
            <p className="text-gray-200 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
              {slide.description}
            </p>

             {/* Buttons */}
                <div className="flex flex-wrap slides-center gap-3 sm:gap-4">
                  <Link
                    href={slide.primaryBtnLink}
                    tabIndex={index === currentSlide ? 0 : -1}
                    className="group btn min-h-13 rounded-full border-none bg-[#65B493] px-5 text-sm font-bold text-[#123D2D] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#A5DCC8] hover:shadow-xl sm:px-7 sm:text-base"
                  >
                    <BiSolidEditLocation className="text-lg" />
                    {slide.primaryBtnText}
                    <span className="ml-1 flex h-7 w-7 slides-center justify-center rounded-full bg-white/25 transition-transform duration-300 group-hover:translate-x-1">
                      <FaArrowRight className="text-xs mt-2" />
                    </span>
                  </Link>

                  <Link
                    href="/about"
                    tabIndex={index === currentSlide ? 0 : -1}
                    className="group btn min-h-13 rounded-full border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#A5DCC8] hover:bg-white hover:text-[#245844] sm:px-7 sm:text-base"
                  >
                    <FaCircleCheck className="text-base text-[#A5DCC8] group-hover:text-[#438F70]" />
                    আরো জানুন এখানে
                    <FaArrowRight className="ml-1 text-xs transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
       <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="btn btn-circle absolute top-1/2 left-3 z-20 hidden -translate-y-1/2 border border-white/25 bg-black/20 text-white shadow-lg backdrop-blur-md transition-all hover:border-[#A5DCC8] hover:bg-[#65B493] hover:text-[#173D31] sm:flex lg:left-6"
      >
        <FaChevronLeft />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="btn btn-circle absolute top-1/2 right-3 z-20 hidden -translate-y-1/2 border border-white/25 bg-black/20 text-white shadow-lg backdrop-blur-md transition-all hover:border-[#A5DCC8] hover:bg-[#65B493] hover:text-[#173D31] sm:flex lg:right-6"
      >
        <FaChevronRight />
      </button>

      {/* Bottom slide navigation */}
      <div className="absolute right-0 bottom-5 left-0 z-20 flex items-center justify-center gap-3 sm:bottom-7">
        {slides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-10 bg-[#A5DCC8]"
                : "w-2.5 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
