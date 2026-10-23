import AboutSection from "@/components/homecomponent/AboutSection";
import Banner from "@/components/homecomponent/Banner";
import ServicePage from "@/components/homecomponent/ServicePage";
import TestimonialsPage from "@/components/homecomponent/Testimonials";

export default function Home() {
  return (
    <div>
      <main>
        <Banner />

        {/* Quick Trust Badges / Stats Section */}
        <section className="bg-base-200 py-8 px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-base-100 rounded-xl shadow-sm">
              <h3 className="text-3xl font-bold text-primary">১০০%</h3>
              <p className="text-sm text-gray-600 mt-1">ভেরিফাইড কেয়ারগিভার</p>
            </div>
            <div className="p-6 bg-base-100 rounded-xl shadow-sm">
              <h3 className="text-3xl font-bold text-primary">২৪/৭</h3>
              <p className="text-sm text-gray-600 mt-1">কাস্টমার সাপোর্ট</p>
            </div>
            <div className="p-6 bg-base-100 rounded-xl shadow-sm">
              <h3 className="text-3xl font-bold text-primary">৫,০০০+</h3>
              <p className="text-sm text-gray-600 mt-1">সন্তুষ্ট পরিবার</p>
            </div>
            <div className="p-6 bg-base-100 rounded-xl shadow-sm">
              <h3 className="text-3xl font-bold text-primary">ইনস্ট্যান্ট</h3>
              <p className="text-sm text-gray-600 mt-1">সহজ বুকিং সিস্টেম</p>
            </div>
          </div>
        </section>

        <AboutSection />
        <ServicePage />
        <TestimonialsPage />
      </main>
    </div>
  );
}
