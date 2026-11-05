"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  FaPaperPlane,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  // নিউজলেটার সাবমিশন হ্যান্ডলার
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      Swal.fire({
        icon: "success",
        title: "সাবস্ক্রিপশন সফল হয়েছে!",
        text: "আমাদের নিউজলেটারে যুক্ত হওয়ার জন্য ধন্যবাদ।",
        confirmButtonColor: "#22c55e",
      });
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="bg-base-200/80 text-base-content border-t border-base-300">
      <div className="px-8 lg:px-12 py-12 lg:py-16">
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1 & 2: Brand Info & Logo (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 -mt-4">
            <Link href="/" className="inline-block">
              <Image
                src="/carexyzlogo.png"
                height={110}
                width={120}
                alt="Care.xyz Logo"
                priority
              />
            </Link>
            <p className="text-base-content/70 text-sm leading-relaxed max-w-sm">
              Care.xyz হলো আপনার ও আপনার পরিবারের বিশ্বস্ত হোম কেয়ার
              প্ল্যাটফর্ম। আমরা পেশাদার কেয়ারগিভার ও নার্সদের মাধ্যমে আপনার ঘরেই
              নিশ্চিত করি সর্বোচ্চ সুরক্ষা ও সেবা।
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <FaLinkedinIn size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">দ্রুত লিংক</h3>
            <ul className="space-y-2.5 text-sm font-medium text-base-content/70">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  হোম
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                >
                  সকল সার্ভিস
                </Link>
              </li>
              <li>
                <Link
                  href="/my-bookings"
                  className="hover:text-primary transition-colors"
                >
                  আমার বুকিং
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  যোগাযোগ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">যোগাযোগ</h3>
            <ul className="space-y-3 text-sm text-base-content/70">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-primary mt-1 shrink-0" />
                <span>ধানমন্ডি, ঢাকা-১২০৯, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-primary shrink-0" />
                <span>+৮৮০ ১৭০০ ১২৩ ৪৫৬</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="text-primary shrink-0" />
                <span>support@care.xyz</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">নিউজলেটার</h3>
            <p className="text-sm text-base-content/70">
              আমাদের নতুন আপডেট ও অফার পেতে ইমেল সাবস্ক্রাইব করুন।
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
              <input
                type="email"
                placeholder="আপনার ইমেল লিখুন"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full rounded-xl bg-base-100 text-sm"
                required
              />
              <button
                type="submit"
                disabled={subscribing}
                className="btn btn-primary text-white w-full rounded-xl font-bold text-sm gap-2 shadow-sm"
              >
                {subscribing ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <FaPaperPlane /> সাবস্ক্রাইব করুন
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-8"></div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-content/60 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Care.xyz. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              প্রাইভেসি পলিসি
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              শর্তাবলী
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              কুকি পলিসি
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
