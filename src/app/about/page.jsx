import Image from "next/image";
import Link from "next/link";


const AboutPage = () => {
  return (
    <div className="pt-16 pb-6 px-6 lg:px-8 text-center">
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            আপনার প্রিয়জনদের জন্য{" "}
            <span className="text-primary font-bold">নিরাপদ ও নির্ভরযোগ্য</span> হোম কেয়ার
          </h1>
          <p className="text-lg text-base-content/70 mt-4">
            <span className="text-primary font-bold">Care.xyz</span> হলো এমন একটি পেশাদার প্ল্যাটফর্ম, যা পরিবারগুলোকে তাদের
            ব্যস্ত সময়ে বিশ্বস্ত কেয়ারগিভার, নার্স এবং অভিজ্ঞ সেবাকারীদের সাথে
            যুক্ত করে।
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 bg-base-200/50 p-8 rounded-xl border border-base-300">
            <h2 className="text-2xl font-bold text-primary">
              আমাদের লক্ষ্য ও উদ্দেশ্য
            </h2>
            <p className="text-base-content/80 leading-relaxed">
              আজকের ব্যস্ত জীবনে বাবা-মা, অসুস্থ রোগী কিংবা নবজাতকের সঠিক যত্ন
              নেওয়া অনেক সময় কঠিন হয়ে দাঁড়ায়। আমাদের লক্ষ্য হলো ঘরে বসেই অত্যন্ত
              সাশ্রয়ী মূল্যে এবং সম্পূর্ণ নিরাপত্তার সাথে দক্ষ কেয়ারগিভার
              নিশ্চিত করা।
            </p>
            <ul className="space-y-3 font-medium">
              <li className="flex items-center gap-2">
                ✅ যাচাইকৃত ও প্রশিক্ষিত কেয়ারগিভার
              </li>
              <li className="flex items-center gap-2">
                ✅ ২৪/৭ বুকিং ও কাস্টমার সাপোর্ট
              </li>
              <li className="flex items-center gap-2">
                ✅ সাশ্রয়ী ও স্বচ্ছ মূল্য নির্ধারণ
              </li>
            </ul>
          </div>

          <div className="relative h-108 lg:h-80 rounded-xl overflow-hidden shadow-lg border border-base-300">
            <Image
              src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1200&auto=format&fit=crop"
              alt="Care.xyz Team"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">কেন <span className="text-primary">Care.xyz</span> বেছে নেবেন?</h2>
            <p className="text-base-content/70 mt-2">
              আমরা প্রতিটি পরিবারকে আপন ভেবে সর্বোচ্চ মানের সেবা প্রদানে
              প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-base-200/50 p-6 rounded-xl border border-base-300 space-y-3 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto text-xl font-bold">
                🛡️
              </div>
              <h3 className="font-bold text-lg">সম্পূর্ণ নিরাপদ</h3>
              <p className="text-sm text-base-content/60">
                সকল কেয়ারগিভারের ব্যাকগ্রাউন্ড ও পরিচয় যাচাইকৃত।
              </p>
            </div>

            <div className="bg-base-200/50 p-6 rounded-xl border border-base-300 space-y-3 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto text-xl font-bold">
                🩺
              </div>
              <h3 className="font-bold text-lg">বিশেষায়িত সেবা</h3>
              <p className="text-sm text-base-content/60">
                শিশু, প্রবীণ এবং অসুস্থদের জন্য আলাদা ক্যাটাগরির সেবা।
              </p>
            </div>

            <div className="bg-base-200/50 p-6 rounded-xl border border-base-300 space-y-3 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto text-xl font-bold">
                ⏰
              </div>
              <h3 className="font-bold text-lg">নমনীয় বুকিং</h3>
              <p className="text-sm text-base-content/60">
                ঘণ্টাভিত্তিক বা দিনভিত্তিক প্রয়োজন অনুযায়ী বুক করার সুবিধা।
              </p>
            </div>

            <div className="bg-base-200/50 p-6 rounded-xl border border-base-300 space-y-3 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto text-xl font-bold">
                💬
              </div>
              <h3 className="font-bold text-lg">সহমর্মিতা ও যত্ন</h3>
              <p className="text-sm text-base-content/60">
                আন্তরিকতা ও পেশাদারিত্বের সাথে রোগীর সেবা নিশ্চিত করা হয়।
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary text-primary-content rounded-xl p-8 lg:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl font-bold">
            আপনার পরিবারের জন্য আজই কেয়ার বুক করুন
          </h2>
          <p className="max-w-xl mx-auto opacity-90">
            ঘরে বসে বিশ্বস্ত সেবা পেতে আমাদের সার্ভিস ক্যাটালগ ব্রাউজ করুন এবং
            আপনার পছন্দমতো সেবা বেছে নিন।
          </p>
          <Link
            href="/services"
            className="btn bg-white text-primary hover:bg-base-200 border-none font-bold px-8 rounded-xl text-base"
          >
            সকল সার্ভিস দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
