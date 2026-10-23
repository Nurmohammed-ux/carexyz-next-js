import { getServices } from "@/action/server/service";
import ServiceCard from "../cards/ServiceCard";


const ServicePage = async () => {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-base-200/40">
      {/* Hero Header for Services */}
      <div className="pt-16 pb-6 px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content">
          আমাদের পেশাদার কেয়ারগিভিং সেবাসমূহ
        </h1>
        <p className="text-base text-base-content/70 mt-6">
          আপনার শিশু বা প্রবীণ স্বজনদের জন্য বেছে নিন বিশ্বস্ত ও নির্ভরযোগ্য
          কেয়ার সার্ভিস।
        </p>
      </div>

      {/* Services Grid Section */}
      <div className="px-6 lg:px-8 pt-8">
        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-base-100 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-base-content">
              বর্তমানে কোনো সার্ভিস উপলব্ধ নেই
            </h3>
            <p className="text-sm text-base-content/60 mt-1">
              দয়া করে একটু পরে আবার চেষ্টা করুন।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
